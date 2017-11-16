import React from 'react'
import {FormattedMessage} from 'react-intl'
import UserManagementAddNew from '../components/UserManagementAddNew'
import UserManagementList from '../components/UserManagementList'
import {Collapse} from 'react-bootstrap'

export default class Usersettings extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {};
    }

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
            <div className="usermanagement">
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h1" id="view.user.title"/>

                        <button className="btn btn-primary pull-right"
                                onClick={() => this.setState({open: !this.state.open})}>
                            {this.state.open ?
                                <FormattedMessage id="button.newuser.closeform"/>
                            :
                                <FormattedMessage id="button.newuser.openform"/>
                            }
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Collapse in={this.state.open}>
                            <div>
                                <UserManagementAddNew
                                    sendData={(newUser) => console.log("new User", JSON.stringify(newUser))}/>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <UserManagementList userList={userList}/>
                    </div>
                </div>
            </div>
        );
    }
}
