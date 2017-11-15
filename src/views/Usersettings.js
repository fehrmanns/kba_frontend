import React from 'react'
import {FormattedMessage} from 'react-intl'
import FormattedInput from '../components/i18n/FormattedInput'

export default class Usersettings extends React.Component {

    render() {
        return (
            <div className="starter-template">
                <h1><FormattedMessage id="view.user.title"/></h1>
                <form>
                    <div className="form-group">

                        <FormattedInput type="text" className="form-control" placeholder="input.firstname"/>
                        <FormattedInput type="text" className="form-control" placeholder="input.lastname"/>
                    </div>
                </form>
            </div>
        );
    }
}
