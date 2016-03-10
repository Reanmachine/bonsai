import React, { PropTypes } from "react";

import {
    PlayerModes
}                                from "../../Constants";

import * as PlayerActionCreators from "../../actions/player";

class CommonPage extends React.Component {

    static propTypes = {
        // Required
        dispatch: PropTypes.func.isRequired,
        // Optional
        navigationKey: PropTypes.any,
        onNavigate: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
    }

    // --- Local

    onNavigate(prevProps = {}) {
        let oldNavigationKey = prevProps.navigationKey;
        let newNavigationKey = this.props.navigationKey;

        if (oldNavigationKey !== newNavigationKey)
        {
            this.props.dispatch(
                PlayerActionCreators.updateMode(PlayerModes.MIN)
            );

            if (this.props.onNavigate) {
                this.props.onNavigate(newNavigationKey);
            }
        }
    }

    // --- React Lifecylce

    componentDidMount() {
        this.onNavigate();
    }

    componentDidUpdate(prevProps) {
        this.onNavigate(prevProps);
    }

    // --- React Render

    render() {
        return React.Children.only(this.props.children);
    }


}

export default CommonPage;
