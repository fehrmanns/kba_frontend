import React from "react";
import {FormattedMessage} from "react-intl";

export default class Joblist extends React.Component {
    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.joblist.title" /></h1>
                <p className="lead"><FormattedMessage id="view.joblist.body" /></p>
            </div>
        );
    }
}
