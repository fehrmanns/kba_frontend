import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import UserManagementListItem from "./UserManagementListItem";
import { getUsers } from "../../actions";
import { connect } from "react-redux";

class UserManagementList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: this.props.userList,
        };

        this.props.dispatch(getUsers());
    }

    componentWillReceiveProps(nextProps) {
        (nextProps.userList !== this.state.userList) && this.setState({userList: nextProps.userList});
    }

    render() {
        const {
            updateUser,
            deleteUser,
            currentUser,
        } = this.props;
        const {userList} = this.state;

        return (
            <div>
                <FormattedMessage tagName="h3" id="usermanagement.list.headline" />
                <div>
                    {userList ?
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
                                {userList.map(userItem =>
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
                        :
                        <div className="loader">Loading...</div>
                    }
                </div>
            </div>
        );
    }
}

UserManagementList.propTypes = {
    currentUser: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    userList: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
    const {users} = state;
    const userList = users.list;

    return {
        userList,
    };
}

export default connect(mapStateToProps)(UserManagementList);
