import React from "react";
import {FormattedMessage} from "react-intl";

export default class Recordings extends React.Component {
    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.recordings.title" /></h1>
                <p className="lead"><FormattedMessage id="view.recordings.body" /></p>
            </div>
        );
    }
}
