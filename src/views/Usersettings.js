import React from 'react'
import {FormattedMessage} from 'react-intl'
import UserManagementAddNew from '../components/UserManagementAddNew'

export default class Usersettings extends React.Component {

    render() {

        return (
            <div>
                <FormattedMessage tagName="h1" id="view.user.title"/>
                <UserManagementAddNew />
            </div>
        );
    }
}
