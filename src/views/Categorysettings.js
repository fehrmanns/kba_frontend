import React from 'react'
import {FormattedMessage} from 'react-intl'

export default class Categorysettings extends React.Component {

    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.category.title"/></h1>
                <p className="lead"><FormattedMessage id="view.category.body"/></p>
            </div>
        );
    }
}
