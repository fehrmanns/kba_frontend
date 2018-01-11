import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Collapse} from "react-bootstrap";
import {addUser, getUsers, updateUser, deleteUser, getAllOrgUnits} from "../actions";
import UserManagementAddNew from "../components/UserManagement/UserManagementAddNew";
import UserManagementList from "../components/UserManagement/UserManagementList";
import {toggleItem, getItem} from "./../utilities/storage";
import "./../css/usermanagement.css";

class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: getItem("add_user_open")};
        this.props.dispatch(getUsers());
        this.props.dispatch(getAllOrgUnits());
        this.addNewUser = this.addNewUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.toggleAddUser = this.toggleAddUser.bind(this);
    }


    addNewUser(newUser) {
        this.props.dispatch(addUser(newUser)).then(() => this.props.dispatch(getUsers()));
    }

    // we got a reload option here in case the admin has changed user data and didn't save them.
    updateUser(user, reload = true) {
        this.props.dispatch(updateUser(user))
            .then(reload && (() => this.props.dispatch(getUsers())));
    }

    deleteUser(user) {
        this.props.dispatch(deleteUser(user))
            .then(() => this.props.dispatch(getUsers()));
    }

    toggleAddUser() {
        toggleItem("add_user_open");
        this.setState({
            open: getItem("add_user_open"),
        });
    }


    render() {
        const {userList, userAreLoaded, currentUser} = this.props;
        return (
            <div className="usermanagement">

                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h1" id="view.user.title" />
                    </div>
                </div>
                {(userList && currentUser) ?
                    <div>
                        {(this.props.rights.users.post) &&
                        <div className="row">
                            <div className="col-xs-12">
                                <button
                                    className="btn btn-primary pull-right"
                                    onClick={() => this.toggleAddUser()}
                                >
                                    {this.state.open ?
                                        <FormattedMessage id="button.newuser.closeform" />
                                        :
                                        <FormattedMessage id="button.newuser.openform" />
                                    }
                                </button>
                            </div>
                            <div className="col-xs-12">
                                <Collapse in={this.state.open}>
                                    <div>
                                        <UserManagementAddNew sendData={newUser => this.addNewUser(newUser)} />
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        }
                        {(this.props.rights.users.get) &&
                        <div className="row">
                            <div className="col-xs-12">
                                {userAreLoaded && this.props.rights.users.get &&
                                <UserManagementList
                                    currentUser={currentUser}
                                    users={userList}
                                    deleteUser={this.deleteUser}
                                    updateUser={this.updateUser}
                                />}
                            </div>
                        </div>
                        }
                    </div>
                    :
                    <div className="loader">Loading...</div>
                }
            </div>
        );
    }
}

UserManagement.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userList: PropTypes.array.isRequired,
    userAreLoaded: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
    rights: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {users, auth} = state;
    const currentUser = auth.user;
    const userList = users.list;
    const userAreLoaded = users.isLoaded;
    const {rights} = auth;

    return {
        userList,
        userAreLoaded,
        currentUser,
        auth,
        rights,
    };
}

export default connect(mapStateToProps)(UserManagement);
