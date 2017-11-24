import React from "react";
import {FormattedMessage} from "react-intl";
import UserManagementListItem from "./UserManagementListItem";

export default class UserManagementList extends React.Component {
    render() {
        const { users, deleteUser } = this.props;

        return (
            <div>
                <FormattedMessage tagName="h3" id="usermanagement.list.headline" />
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="usermanagement.list.loginName" /></th>
                            <th><FormattedMessage id="usermanagement.list.firstName" /></th>
                            <th><FormattedMessage id="usermanagement.list.lastName" /></th>
                            <th><FormattedMessage id="usermanagement.list.roleName" /></th>
                            <th><FormattedMessage id="usermanagement.list.created" /></th>
                            {/*
                            <th><FormattedMessage id="usermanagement.list.modified"/></th>
                            <th><FormattedMessage id="usermanagement.list.modifiedBy"/></th>
                            */}
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(userItem => <UserManagementListItem key={`ListItem.${userItem.loginName}`} userItem={userItem} deleteUser={deleteUser} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}
