import React from 'react'
import {FormattedMessage} from 'react-intl'
import UserManagementAddNew from '../components/UserManagementAddNew'
import UserManagementList from '../components/UserManagementList'

export default class Usersettings extends React.Component {

    render() {
        const userList = {
            "kbaUserDtos": [{
                "loginName": "admin",
                "firstName": "",
                "lastName": "",
                "password": null,
                "passwordHash": null,
                "roleName": "admin",
                "active": true,
                "expired": false,
                "created": "2017-11-14T14:02:49.44353Z",
                "createdBy": null,
                "modified": null,
                "modifiedBy": null,
                "kbaRestServices": null
            }, {
                "loginName": "m.mustermann",
                "firstName": "Maximilian",
                "lastName": "von Mustermann2",
                "password": null,
                "passwordHash": null,
                "roleName": "supervisor",
                "active": true,
                "expired": false,
                "created": "2017-11-15T08:05:04.65Z",
                "createdBy": "admin",
                "modified": "2017-11-15T08:05:05.174Z",
                "modifiedBy": "m.mustermann",
                "kbaRestServices": null
            }]
        };

        return (
            <div>
                <FormattedMessage tagName="h1" id="view.user.title"/>
                <UserManagementAddNew sendData={(newUser) => console.log("new User", JSON.stringify(newUser))}/>
                <UserManagementList userList={userList}/>
            </div>
        );
    }
}
