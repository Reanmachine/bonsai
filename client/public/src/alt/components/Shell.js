import React            from "react"

import * as Constants   from "../Constants"
import Component        from "../Component"

import Header           from "./common/Header"
import Menu             from "./common/Menu"
import Footer           from "./common/Footer"

import OverlayWindow    from "./common/OverlayWindow"

import RegisterForm     from "./session/RegisterForm.js"
import LoginForm        from "./session/LoginForm"


export default class Shell extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isReady: false
        }
    }

    getRequiredActions() {
        return {
            'session': Constants.Actions.SESSION
        };
    }

    getRequiredStores() {
        return {
            'system': Constants.Stores.SYSTEM
        };
    }

    onStoreUpdated(storeKey, state) {
        // TEMP - Demonstration, this will die

        if (storeKey === Constants.Stores.SYSTEM) {
            this.setState({
                isReady: state.isReady
            });
        }
    }

    render() {

        var message = this.state.isReady
            ? "The Initialization Event has fired and the application has been notified."
            : "The Application has rendered, but the initialize event has not fired yet. This should happen within 5 seconds.";

        var isRegisterShown = (key, state) => state.register.state !== Constants.RegisterStates.NONE;
        var isLoginShown    = (key, state) => state.login.state !== Constants.LoginStates.NONE;

        var requiredStores = {'store': Constants.Stores.SESSION};

        var onRegister  = (ev) => { this.actions.session.registerBegin(); };
        var onLogin     = (ev) => { this.actions.session.loginBegin(); };

        return (

            <div>
                <div id="bonsai" className="c-shell">
                    <div className="e-header">
                        <Header />
                    </div>
                    <div className="e-menu">
                        <Menu />
                    </div>
                    <div className="e-content">
                        <div style={{padding: '10px'}}>
                            {message}
                        </div>
                        <div style={{padding: '10px'}}>
                            <a href="#" onClick={onRegister}>
                                Register
                            </a>
                             |
                            <a href="#" onClick={onLogin}>
                                Login
                            </a>
                        </div>
                    </div>
                    <div className="e-footer">
                        <Footer />
                    </div>
                </div>

                <OverlayWindow requiredStores={requiredStores} isShown={isRegisterShown}>
                    <RegisterForm />
                </OverlayWindow>

                <OverlayWindow requiredStores={requiredStores} isShown={isLoginShown}>
                    <LoginForm />
                </OverlayWindow>

            </div>

        );
    }

}