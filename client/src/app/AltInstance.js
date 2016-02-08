import Alt from "alt"

import * as Constants from "./Constants"
import { debug } from "./Utilities"
import Storage from "./Storage"

import PlayerActions from "./actions/PlayerActions"
import PlayerStore from "./stores/PlayerStore"

import QueueActions from "./actions/QueueActions"
import QueueStore from "./stores/QueueStore"

import SystemActions from "./actions/SystemActions"
import SystemStore from "./stores/SystemStore"

import SessionActions from "./actions/SessionActions"
import SessionStore from "./stores/SessionStore"
import SessionHandler from "./handlers/SessionHandler"

import UIActions from "./actions/UIActions"
import UIStore from "./stores/UIStore"

import UserStore from "./stores/UserStore"

/**
 * This is our "container" for the application. It's the Alt object (flux)
 * that will be provided to every view that needs to get something from
 * the system.
 */
export default class AltInstance extends Alt {
    constructor(config = {}, socket = null, router = null) {
        super(config);

        if (!socket) {
            throw "No socket instance."
        }

        if (!router) {
            throw "No router prototype."
        }

        this._socket = socket;
        this._router = router;
        this._handlers = {};

        this.registerActions();
        this.registerStores();
        this.registerHandlers();

        this.attachSocket();
    }

    get socket() {
        return this._socket;
    }

    get router() {
        return this._router;
    }

    addHandler(key, handler) {

        var handlerInstance = new handler(this);
        handlerInstance.attach();

        this._handlers[key] = handlerInstance;
    }

    registerActions() {
        this.addActions(Constants.Actions.PLAYER, PlayerActions);
        this.addActions(Constants.Actions.QUEUE, QueueActions);
        this.addActions(Constants.Actions.SYSTEM, SystemActions);
        this.addActions(Constants.Actions.SESSION, SessionActions);
        this.addActions(Constants.Actions.UI, UIActions);
    }

    registerStores() {
        this.addStore(Constants.Stores.PLAYER, PlayerStore);
        this.addStore(Constants.Stores.QUEUE, QueueStore);
        this.addStore(Constants.Stores.SYSTEM, SystemStore);
        this.addStore(Constants.Stores.SESSION,SessionStore);
        this.addStore(Constants.Stores.UI, UIStore);
        this.addStore(Constants.Stores.USER, UserStore);
    }

    registerHandlers() {
        this.addHandler(Constants.Handlers.SESSION, SessionHandler);
    }

    attachSocket() {

        let systemActions   = this.getActions(Constants.Actions.SYSTEM);

        this._socket.on('connect', () => {
            debug('Socket: Connect');
            systemActions.connectionStateChanged(Constants.ConnectionStates.CONNECTED);

            this.autoLogin();
        });

        this._socket.on('error', (e) => {
            debug('Socket: Error', e);
        });

        this._socket.on('disconnect', () => {
            debug('Socket: Disconnect');
            systemActions.connectionStateChanged(Constants.ConnectionStates.NOT_CONNECTED);
        });

        this._socket.on('reconnect', (num) => {
            debug('Socket: Reconnect', num);
        });

        this._socket.on('reconnect_attempt', () => {
            debug('Socket: Reconnect Attempt');
        });

        this._socket.on('reconnecting', () => {
            debug('Socket: Reconnecting');
            systemActions.connectionStateChanged(Constants.ConnectionStates.CONNECTING);
        });

        this._socket.on('reconnect_error', (error) => {
            debug('Socket: Reconnect Error', error);
        });

        this._socket.on('reconnect_failed', () => {
            debug('Socket: Reconnect Failed');
        });

        this._socket.on('broadcast', (payload) => {
            let {event, data} = payload;

            this.handleBroadcast(event, data);
        });

        // Set the initial state
        if (this._socket.socket.io.readyState === "open") {
            systemActions.connectionStateChanged(Constants.ConnectionStates.CONNECTED);
            this.autoLogin();
        } else {
            systemActions.connectionStateChanged(Constants.ConnectionStates.NOT_CONNECTED);
        }
    }

    handleBroadcast(event, data) {

        debug('Broadcast Received', event, data);

        for (let key of Object.keys(this._handlers)) {
            let handler = this._handlers[key];
            if (handler && handler.invoke(event, data)) {
                break;
            }
        }
    }

    autoLogin() {

        let sessionActions  = this.getActions(Constants.Actions.SESSION);

        // Auto-Login if we have a token.
        let token = Storage.sessionToken;
        debug('Token: ' + token);

        if (token) {
            this._socket
                .call("Session:loginToken", {
                    token: token
                })
                .then(function(result) {
                    sessionActions.update(
                        result.user,
                        result.session,
                        result.perms
                    );
                })
                .catch(function(reason) {
                    debug('Socket: auto-login failed because: ' + reason);

                    // Clear the token
                    //sessionActions.logoutOk();
                    // TODO: Something needs to be done here...
                })
        }
    }
}