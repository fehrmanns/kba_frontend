import React from "react";
import PropTypes from "prop-types";
import {MenuItem} from "react-bootstrap";
import {FormattedDate, FormattedMessage} from "react-intl";
import FormattedDropDown from "./i18n/FormattedDropDown";


class UserManagementListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.userItem.firstName ? this.props.userItem.firstName : "",
            lastName: this.props.userItem.lastName ? this.props.userItem.lastName : "",
            roleName: (this.props.userItem.roleName.toLowerCase()),
            active: this.props.userItem.active,
            firstNameModified: false,
            lastNameModified: false,
            roleNameModified: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        const targetName = event.target.id.replace("tableInput", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase());

        this.setState({
            [targetName]: event.target.value,
        });
        this.compareContent(targetName, event.target.value);
    }

    handleSelection(value) {
        this.setState({roleName: value});
        this.compareContent("roleName", value);
    }

    compareContent(name, value) {
        const propName = `${name}Modified`;
        const compareItem = (this.props.userItem[name] === null) ? "" : this.props.userItem[name];
        (compareItem.toLowerCase() !== value) ? this.setState({[propName]: true}) : this.setState({[propName]: false});
    }

    toggleUser() {
        this.setState({
            active: !this.state.active,
        });

        const user = Object.assign({}, this.props.userItem, {active: !this.props.userItem.active});
        this.props.updateUser(user, false);
    }

    handleUpdate() {
        const user = Object.assign({}, this.props.userItem, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            roleName: this.state.roleName.toUpperCase(),
        });
        this.props.updateUser(user, true);
        this.setState({
            firstNameModified: false,
            lastNameModified: false,
            roleNameModified: false,
        });
    }


    render() {
        const user = this.props.userItem;
        const {currentUser} = this.props;
        const activeUser = this.state.active;
        const roleDropDownTitleId = `dropdown.role.${this.state.roleName}`;
        const modified = this.state.firstNameModified || this.state.lastNameModified || this.state.roleNameModified;

        return (
            <tr className={!activeUser && "deactivated"}>
                <td><span>{user.loginName}</span></td>
                <td><input id="tableInputFirstName" onChange={this.handleChange} value={this.state.firstName} /></td>
                <td><input id="tableInputLastName" onChange={this.handleChange} value={this.state.lastName} /></td>
                <td>
                    {(user.loginName !== currentUser.loginName) ?
                        <FormattedDropDown id="newUser.roleName.selection" bsStyle="link" titleId={roleDropDownTitleId} onSelect={this.handleSelection}>
                            <MenuItem eventKey="admin"><FormattedMessage id="dropdown.role.admin" /></MenuItem>
                            <MenuItem eventKey="supervisor"><FormattedMessage id="dropdown.role.supervisor" /></MenuItem>
                            <MenuItem eventKey="analyst"><FormattedMessage id="dropdown.role.analyst" /></MenuItem>
                        </FormattedDropDown>
                        :
                        <FormattedMessage id={roleDropDownTitleId} />
                    }
                </td>
                <td className="date">
                    <span>
                        {!!user.created && <FormattedDate value={user.created} day="2-digit" month="short" year="numeric" />}
                    </span>
                </td>
                {/*
                <td className="date">
                    <span>
                    {!!user.modified && <FormattedDate value={user.modified} day="2-digit" month="short" year="numeric" /> }
                    </span>
                </td>
                <td className="date">
                    <span>
                    {!!user.modifiedBy && user.modifiedBy}
                    </span>
                </td>
                */}
                <td className="text-center">
                    {(user.loginName !== currentUser.loginName) &&
                    <button className={activeUser ? "btn btn-xs btn-warning" : "btn btn-xs btn-info"} onClick={() => this.toggleUser()}>
                        {activeUser ? <FormattedMessage id="button.user.deactivate" /> : <FormattedMessage id="button.user.activate" />}
                    </button>
                    }
                </td>

                {modified ?
                    <td className="text-center">
                        <button className="btn btn-xs btn-success" onClick={() => this.handleUpdate()}>
                            <FormattedMessage id="button.user.update" />
                        </button>
                    </td>
                    :
                    <td className="text-center">
                        {(user.loginName !== currentUser.loginName) &&
                        <button className="btn btn-xs btn-danger" onClick={() => this.props.deleteUser(user.loginName)}>
                            <FormattedMessage id="button.user.delete" />
                        </button>
                        }
                    </td>
                }
            </tr>
        );
    }
}

UserManagementListItem.propTypes = {
    userItem: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
};

export default UserManagementListItem;
