import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {MenuItem} from "react-bootstrap";
import {FormattedDate, FormattedMessage, FormattedTime} from "react-intl";
import {openPasswordModal} from "../../actions";
import FormattedDropDown from "../i18n/FormattedDropDown";
import FormattedButton from "../i18n/FormattedButton";
import FormattedTypeahead from "../i18n/FormattedTypeahead";


class UserManagementListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.userItem.firstName ? this.props.userItem.firstName : "",
            lastName: this.props.userItem.lastName ? this.props.userItem.lastName : "",
            roleName: (this.props.userItem.roleName.toLowerCase()),
            active: this.props.userItem.active,
            kbaOuNames: this.props.userItem.kbaOuNames ? this.props.userItem.kbaOuNames : [],
            firstNameModified: false,
            lastNameModified: false,
            roleNameModified: false,
            kbaOuNamesModified: false,
        };

        // TODO: add validation
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        const targetName = event.target.id.replace("tableInput", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase()).replace(`-${this.props.userItem.loginName}`, "");

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
        this.props.updateUser(user, true);
    }

    handleUnitChange(item) {
        console.log("item", item);
        const isModified = (item.length !== 0 && item !== this.props.userItem.kbaOuNames);

        this.setState({
            kbaOuNames: item,
            kbaOuNamesModified: isModified,
        });
    }

    handleUpdate() {
        const user = Object.assign({}, this.props.userItem, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            roleName: this.state.roleName.toUpperCase(),
            kbaOuNames: this.state.kbaOuNames,
        });
        this.props.updateUser(user, true);
        this.setState({
            firstNameModified: false,
            lastNameModified: false,
            roleNameModified: false,
            kbaOuNamesModified: false,
        });
    }


    render() {
        const user = this.props.userItem;
        const {currentUser, unitList} = this.props;
        const activeUser = this.state.active;
        const roleDropDownTitleId = `dropdown.role.${this.state.roleName}`;
        const modified = this.state.firstNameModified || this.state.lastNameModified || this.state.roleNameModified || this.state.kbaOuNamesModified;
        const unitNames = unitList.filter(item => item.containsUsers).map(item => item.name);

        return (
            <tr className={!activeUser ? "deactivated" : ""}>
                <td><span>{user.loginName}</span></td>
                <td>
                    {this.props.rights.users.put ?
                        <input
                            id={`tableInputFirstName-${user.loginName}`}
                            onChange={this.handleChange}
                            value={this.state.firstName}
                            className="form-control"
                        />
                        :
                        <span>{this.state.firstName}</span>
                    }
                </td>
                <td>{this.props.rights.users.put ?
                    <input
                        id={`tableInputLastName-${user.loginName}`}
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        className="form-control"
                    />
                    : <span>{this.state.firstName}</span>
                }
                </td>
                <td>
                    {(user.loginName !== currentUser.loginName && this.props.rights.users.put) ?
                        <FormattedDropDown id="newUser.roleName.selection" bsStyle="link" titleId={roleDropDownTitleId} onSelect={this.handleSelection}>
                            <MenuItem eventKey="admin"><FormattedMessage id="dropdown.role.admin" /></MenuItem>
                            <MenuItem eventKey="supervisor"><FormattedMessage id="dropdown.role.supervisor" /></MenuItem>
                            <MenuItem eventKey="analyst"><FormattedMessage id="dropdown.role.analyst" /></MenuItem>
                        </FormattedDropDown>
                        :
                        <FormattedMessage id={roleDropDownTitleId} />
                    }
                </td>
                <td className="typeahead-td">
                    <FormattedTypeahead
                        id="childrenKbaOuTypeNamesSelection"
                        labelKey="name"
                        multiple
                        disabled={(user.loginName === currentUser.loginName) || !this.props.rights.users.put}
                        placeholder="input.childrenKbaOuTypeNamesSelection"
                        options={unitNames}
                        onChange={this.handleUnitChange}
                        selected={this.state.kbaOuNames}
                    />
                </td>
                <td className="date">
                    <span>
                        {!!user.created && <span><FormattedDate value={user.created} day="2-digit" month="short" year="numeric" /><FormattedMessage id="timeSeperator" /><FormattedTime value={user.created} hour="numeric" minute="numeric" second="numeric" /></span>}
                    </span>
                </td>
                <td className="date">
                    <span>
                        {!!user.modified && <span><FormattedDate value={user.modified} day="2-digit" month="short" year="numeric" /><FormattedMessage id="timeSeperator" /><FormattedTime value={user.modified} hour="numeric" minute="numeric" second="numeric" /></span>}
                    </span>
                </td>
                <td className="button-td">
                    {this.props.rights.users.put &&
                    <FormattedButton
                        title="button.user.changePassword"
                        className="btn btn-xs btn-default"
                        onClick={() => this.props.dispatch(openPasswordModal(user))}
                    >
                        <span className="glyphicon glyphicon-lock" />
                    </FormattedButton>
                    }
                </td>
                <td className="button-td">
                    {(user.loginName !== currentUser.loginName && this.props.rights.users.put) &&
                    <FormattedButton title={activeUser ? "button.user.deactivate" : "button.user.activate"} className={activeUser ? "btn btn-xs btn-warning" : "btn btn-xs btn-info"} onClick={() => this.toggleUser()}>
                        {activeUser ? <span className="glyphicon glyphicon-pause" /> : <span className="glyphicon glyphicon-play" />}
                    </FormattedButton>
                    }
                </td>

                {(modified && this.props.rights.users.put) ?
                    <td className="button-td">
                        <FormattedButton title="button.user.update" className="btn btn-xs btn-success" onClick={() => this.handleUpdate()}>
                            <span className="glyphicon glyphicon-pencil" />
                        </FormattedButton>
                    </td>
                    :
                    <td className="button-td">
                        {((user.loginName !== currentUser.loginName) && this.props.rights.users.delete) &&
                        <FormattedButton title="button.user.delete" className="btn btn-xs btn-danger" onClick={() => this.props.deleteUser(user.loginName)}>
                            <span className="glyphicon glyphicon-trash" />
                        </FormattedButton>
                        }
                    </td>
                }
            </tr>
        );
    }
}

UserManagementListItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userItem: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    unitList: PropTypes.array.isRequired,
    rights: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {units, unittypes, auth} = state;
    const types = unittypes.list;
    const unitList = units.list;
    const {rights} = auth;

    return {
        types, unitList, rights,
    };
}

export default connect(mapStateToProps)(UserManagementListItem);
