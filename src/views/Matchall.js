import React from 'react'
import { FormattedMessage } from 'react-intl'

export default class Matchall extends React.Component {

    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.matchall.title"/></h1>
                <p className="lead"><FormattedMessage id="view.matchall.body"/></p>
            </div>
        );
    }
}
