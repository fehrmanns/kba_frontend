import React from 'react'
import {FormattedMessage} from 'react-intl'

export default class Usersettings extends React.Component {

    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.user.title"/></h1>
                <FormattedMessage tagName="p" id="view.user.body"/>
            </div>
        );
    }
}
