import React from "react";
import {FormattedMessage} from "react-intl";

export default class BiometricProfiles extends React.Component {
    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.biometricprofiles.title" /></h1>
                <p className="lead"><FormattedMessage id="view.biometricprofiles.body" /></p>
            </div>
        );
    }
}
