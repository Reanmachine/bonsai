import * as Constants from "../Constants"

export default class SessionActions {

    updateSession(token, user) {
        this.dispatch({
            token: token,
            user: user
        });
    }

    registerBegin() {
        this.actions.registerUpdateView(
            Constants.RegisterStates.OPEN,
            null
        );
    }

    registerCancel() {
        this.actions.registerUpdateView(
            Constants.RegisterStates.NONE,
            null
        );
    }

    register(username, displayname, email, language, password) {

        this.actions.registerUpdateView(
            Constants.RegisterStates.REGISTERING,
            null
        );

        var payload = {
            username: username,
            displayname: displayname,
            email: email,
            language: language,
            password: password
        };

        this.alt.socket
            .call("Session:register", payload)
            .then((result) => {

                var state = Constants.RegisterStates.CONFIRMING;
                var message = null;

                if (!result.success) {
                    state = Constants.RegisterStates.OPEN;
                    message = result.message;
                }

                this.actions.registerUpdateView(
                    state,
                    message
                );
            })
            .catch((reason) => {
                this.actions.registerUpdateView(
                    Constants.RegisterStates.OPEN,
                    reason
                )
            });

        this.dispatch();
    }

    registerUpdateView(state, message) {
        this.dispatch({
            state: state,
            message: message
        });
    }

    loginBegin() {
        this.actions.loginUpdateView(
            Constants.LoginStates.OPEN,
            null
        );
    }

    loginCancel() {
        this.actions.loginUpdateView(
            Constants.LoginStates.NONE,
            null
        );
    }

    login(username, password) {

        this.actions.loginUpdateView(
            Constants.LoginStates.AUTHENTICATING,
            null
        );

        var payload = {
            username: username,
            password: password
        };

        this.alt.socket.call("Session:login", payload)
            .then((result) => {
                this.actions.loginUpdateView(
                    Constants.LoginStates.NONE,
                    null
                );
            })
            .catch((reason) => {
                this.actions.loginUpdateView(
                    Constants.LoginStates.OPEN,
                    reason
                )
            });

    }

    loginUpdateView(state, message) {
        this.dispatch({
            state: state,
            message: message
        });
    }

    loginAuto() {
        this.dispatch();
    }

    logout() {
        this.dispatch();

        // Temp
        setTimeout(() => this.logoutOk(), 5000);
    }

    logoutOk() {
        this.dispatch();
    }

}