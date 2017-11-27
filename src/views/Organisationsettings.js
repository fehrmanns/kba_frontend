import React from "react";
import { FormattedMessage } from "react-intl";

export default class Organisationsettings extends React.Component {
    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.organisation.title" /></h1>
                <p className="lead"><FormattedMessage id="view.organisation.body" /></p>
            </div>
        );
    }
}
