import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {addUser, getUsers, updateUser, deleteUser} from '../actions'
import UserManagementAddNew from '../components/UserManagementAddNew'
import UserManagementList from '../components/UserManagementList'
import {Collapse} from 'react-bootstrap'
import {toggleItem, getItem} from './../utilities/storage'
import './../css/usermanagement.css'

class UserManagement extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addUser: this.props.addUser,
            dispatch: this.props.dispatch,
            open: getItem('add_user_open')
        };

        this.props.dispatch(getUsers());
        this.addNewUser = this.addNewUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.toggleAddUser = this.toggleAddUser.bind(this);
    }

    addNewUser(newUser) {
        this.props.dispatch(addUser(newUser)).then(() => this.props.dispatch(getUsers()));
    }

    updateUser(user) {
        updateUser(user);
        //this.props.dispatch(updateUser(user));
    }

    deleteUser(user) {
        this.props.dispatch(deleteUser(user));
    }

    toggleAddUser() {
        toggleItem("add_user_open");
        this.setState({
            open: getItem("add_user_open")
        });
    }

    render() {
        const { userList, userAreLoaded } = this.props;

        return (
            <div className="usermanagement">
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h1" id="view.user.title"/>

                        <button className="btn btn-primary pull-right"
                                onClick={() => this.toggleAddUser()}>
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
                                <UserManagementAddNew sendData={(newUser) => this.addNewUser(newUser)}/>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        {userAreLoaded && <UserManagementList users={userList} deleteUser={this.deleteUser} updateUser={this.updateUser}/> }
                    </div>
                </div>
            </div>
        );
    }
}

UserManagement.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {

    const { users } = state;
    const userList = users.list;
    const userAreLoaded = users.isLoaded;

    return {
        userList,
        userAreLoaded
    }
}

export default connect(mapStateToProps)(UserManagement)
