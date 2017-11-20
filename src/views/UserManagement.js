import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {addUser, getUsers, updateUser, deleteUser} from '../actions'
import UserManagementAddNew from '../components/UserManagementAddNew'
import UserManagementList from '../components/UserManagementList'
import {Collapse} from 'react-bootstrap'
import './../css/usermanagement.css'

class UserManagement extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addUser: this.props.addUser,
            dispatch: this.props.dispatch
        };

        this.state.dispatch(getUsers());
        this.addNewUser = this.addNewUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    addNewUser(newUser) {
        this.state.dispatch(addUser(newUser)).then(() => this.state.dispatch(getUsers()));
    }

    deleteUser(user) {
        this.state.dispatch(deleteUser(user));
    }

    render() {
        const { userList, userAreLoaded } = this.props;

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
                                <UserManagementAddNew sendData={(newUser) => this.addNewUser(newUser)}/>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        {userAreLoaded && <UserManagementList users={userList} deleteUser={this.deleteUser}/> }
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
