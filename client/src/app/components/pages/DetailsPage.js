import React, { PropTypes } from "react";

import {
    decodeIdentifier
}                           from "../../Utilities";

import CommonPage           from "./CommonPage";

class DetailsPage extends React.Component {

    static PropTypes = {
        // Required
        dispatch: PropTypes.func.isRequired,
        // Optional
        identifier: PropTypes.any,
        onLoadData: PropTypes.func
    };

    onNavigate(key) {
        if (this.props.onLoadData) {
            this.props.onLoadData(key);
        }
    }

    render() {
        return (
            <CommonPage
                dispatch={this.props.dispatch}
                navigationKey={this.props.identifier}
                onNavigate={this.onNavigate.bind(this)}>
                {React.Children.only(this.props.children)}
            </CommonPage>
        )
    }

}

export default DetailsPage;