import React from "react";
import {FormattedMessage} from "react-intl";

export default class License extends React.Component {
    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.license.title" /></h1>
                <p className="lead"><FormattedMessage id="view.license.body" /></p>
            </div>
        );
    }
}
