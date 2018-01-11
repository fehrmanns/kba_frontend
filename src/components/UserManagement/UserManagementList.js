import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import UserManagementListItem from "./UserManagementListItem";

class UserManagementList extends React.Component {
    render() {
        const {
            users,
            updateUser,
            deleteUser,
            currentUser,
        } = this.props;

        return (
            <div>
                <FormattedMessage tagName="h3" id="usermanagement.list.headline" />
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th><FormattedMessage id="usermanagement.list.loginName" /></th>
                                <th><FormattedMessage id="usermanagement.list.firstName" /></th>
                                <th><FormattedMessage id="usermanagement.list.lastName" /></th>
                                <th><FormattedMessage id="usermanagement.list.roleName" /></th>
                                <th><FormattedMessage id="usermanagement.list.unit" /></th>
                                <th><FormattedMessage id="usermanagement.list.created" /></th>
                                {/*
                                    <th><FormattedMessage id="usermanagement.list.modified"/></th>
                                    <th><FormattedMessage id="usermanagement.list.modifiedBy"/></th>
                                */}
                                <th>{/* placeholder for button */}</th>
                                <th>{/* placeholder for button */}</th>
                                <th>{/* placeholder for button */}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(userItem =>
                                (<UserManagementListItem
                                    key={`ListItem.${userItem.loginName}`}
                                    currentUser={currentUser}
                                    userItem={userItem}
                                    updateUser={updateUser}
                                    deleteUser={deleteUser}
                                />))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

UserManagementList.propTypes = {
    users: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
};

export default UserManagementList;
