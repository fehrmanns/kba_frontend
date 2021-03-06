import React from "react";
import { FormattedMessage } from "react-intl";

export default class Matchlist extends React.Component {
    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.matchlist.title" /></h1>
                <p className="lead"><FormattedMessage id="view.matchlist.body" /></p>
            </div>
        );
    }
}
