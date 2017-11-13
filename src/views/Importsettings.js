import React from 'react'
import {FormattedMessage} from 'react-intl'

export default class Importsettings extends React.Component {

    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.importsettings.title"/></h1>
                <p className="lead"><FormattedMessage id="view.importsettings.body"/></p>
            </div>
        );
    }
}
