import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {addUser, getUsers, updateUser, deleteUser, logoutUser} from "../actions";
import UserManagementAddNew from "../components/UserManagementAddNew";
import UserManagementList from "../components/UserManagementList";
import {Collapse} from "react-bootstrap";
import {toggleItem, getItem} from "./../utilities/storage";
import "./../css/usermanagement.css";

class UserManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: getItem("add_user_open"),
        };

        this.props.dispatch(getUsers());
        this.addNewUser = this.addNewUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.toggleAddUser = this.toggleAddUser.bind(this);
    }


    addNewUser(newUser) {
        this.props.dispatch(addUser(newUser))
            .then((response) => {
                if (response.message === "401") {
                    this.props.dispatch(logoutUser());
                } else {
                    this.props.dispatch(getUsers());
                }
            });
    }
    // we got a reload option here in case the admin has changed user data and didn't save them.
    updateUser(user, reload = true) {
        this.props.dispatch(updateUser(user))
            .then((response) => {
                if (response.message === "401") {
                    this.props.dispatch(logoutUser());
                } else {
                    reload && this.props.dispatch(getUsers());
                }
            });
    }

    deleteUser(user) {
        this.props.dispatch(deleteUser(user))
            .then((response) => {
                if (response.message === "401") {
                    this.props.dispatch(logoutUser());
                } else {
                    this.props.dispatch(getUsers());
                }
            });
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
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <Collapse in={this.state.open}>
                                    <div>
                                        <UserManagementAddNew sendData={newUser => this.addNewUser(newUser)} />
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                {userAreLoaded && <UserManagementList currentUser={currentUser} users={userList} deleteUser={this.deleteUser} updateUser={this.updateUser} />}
                            </div>
                        </div>
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
};

function mapStateToProps(state) {
    const {users, auth} = state;
    const currentUser = auth.user;
    const userList = users.list;
    const userAreLoaded = users.isLoaded;

    return {
        userList,
        userAreLoaded,
        currentUser,
        auth,
    };
}

export default connect(mapStateToProps)(UserManagement);
