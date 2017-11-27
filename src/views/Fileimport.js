import React from "react";
import {FormattedMessage} from "react-intl";

export default class Fileimport extends React.Component {
    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.fileimport.title" /></h1>
                <p className="lead"><FormattedMessage id="view.fileimport.body" /></p>
            </div>
        );
    }
}
