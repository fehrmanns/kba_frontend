import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {MenuItem} from "react-bootstrap";
import FormattedInput from "../components/i18n/FormattedInput";
import FormattedDropDown from "./i18n/FormattedDropDown";

export default class UserManagementAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginName: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordConfirm: "",
            roleName: "default",
            loginNameIsValid: true,
            passwordIsValid: true,
            passwordIsEqual: true,
            roleNameIsValid: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        const targetName = event.target.id.replace("input", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase());

        switch (targetName) {
            case "loginName":
                this.setState({
                    [targetName]: event.target.value,
                    loginNameIsValid: true,
                });
                break;
            case "password":
                this.setState({
                    [targetName]: event.target.value,
                    passwordIsValid: true,
                });
                break;
            case "passwordConfirm":
                this.setState({
                    [targetName]: event.target.value,
                    passwordIsEqual: true,
                });
                break;
            default:
                this.setState({
                    [targetName]: event.target.value,
                });
        }
    }

    handleSelection(value) {
        this.setState({
            roleName: value.toUpperCase(),
            roleNameIsValid: true,
        });
    }

    sendData(event) {
        event.preventDefault();

        const loginNameIsValid = !!this.state.loginName;
        const passwordIsValid = !!this.state.password;
        const roleNameIsValid = (this.state.roleName !== "default");
        const passwordIsEqual = (!!this.state.passwordConfirm) && (this.state.passwordConfirm === this.state.password);

        this.setState({
            loginNameIsValid,
            roleNameIsValid,
            passwordIsValid,
            passwordIsEqual,
        });
        const isValid = loginNameIsValid && roleNameIsValid && passwordIsValid && passwordIsEqual;

        if (!isValid) return;

        const newUser = {...this.state};
        delete newUser.loginNameIsValid;
        delete newUser.roleNameIsValid;
        delete newUser.passwordConfirm;
        delete newUser.passwordIsValid;
        delete newUser.passwordIsEqual;

        this.props.sendData(JSON.stringify(newUser));
        this.resetData();
    }

    resetData() {
        // TODO: set focus on loginName input
        this.setState({
            loginName: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordConfirm: "",
            roleName: "default",
            loginNameIsValid: true,
            passwordIsValid: true,
            passwordIsEqual: true,
            roleNameIsValid: true,
        });
    }

    render() {
        const roleDropDownTitleId = `dropdown.role.${this.state.roleName}`;
        const loginNameError = !this.state.loginNameIsValid;
        const roleNameError = !this.state.roleNameIsValid;
        const passwordError = !this.state.passwordIsValid;
        const passwordEqualError = !this.state.passwordIsEqual;

        return (
            <form className="highlight">
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h3" id="usermanagement.addnew.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className={loginNameError ? "form-group has-error col-xs-6" : "form-group col-xs-6"}>
                        <label className="control-label" htmlFor="inputLoginName">
                            <FormattedMessage id="input.username" />&nbsp;
                            {loginNameError && <FormattedMessage id="input.loginNameError" />}
                        </label>
                        <FormattedInput
                            type="text"
                            id="inputLoginName"
                            className="form-control"
                            placeholder="input.username"
                            onChange={this.handleChange}
                            value={this.state.loginName}
                        />
                    </div>
                    <div className={roleNameError ? "form-group has-error col-xs-6" : "form-group col-xs-6"}>
                        <label className="control-label" htmlFor="newUser.roleName.selection">
                            <FormattedMessage id="dropdown.role.plsselect" />&nbsp;
                            {roleNameError && <FormattedMessage id="dropdown.role.error" />}
                        </label><br />
                        <FormattedDropDown
                            id="newUser.roleName.selection"
                            titleId={roleDropDownTitleId}
                            onSelect={this.handleSelection}
                        >
                            <MenuItem eventKey="admin"><FormattedMessage id="dropdown.role.admin" /></MenuItem>
                            <MenuItem eventKey="supervisor"><FormattedMessage id="dropdown.role.supervisor" /></MenuItem>
                            <MenuItem eventKey="analyst"><FormattedMessage id="dropdown.role.analyst" /></MenuItem>
                        </FormattedDropDown>
                    </div>
                </div>
                <div className="row">
                    <div className={passwordError ? "form-group has-error col-xs-6" : "form-group col-xs-6"}>
                        <label className="control-label" htmlFor="inputPassword">
                            <FormattedMessage id="input.password" />&nbsp;
                            {passwordError && <FormattedMessage id="input.passwordError" />}
                        </label>
                        <FormattedInput
                            type="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="input.password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    <div className={passwordEqualError ? "form-group has-error col-xs-6" : "form-group col-xs-6"}>
                        <label className="control-label" htmlFor="inputPasswordConfirm">
                            <FormattedMessage id="input.passwordConfirm" />&nbsp;
                            {passwordEqualError && <FormattedMessage id="input.passwordConfirmError" />}
                        </label>
                        <FormattedInput
                            type="password"
                            id="inputPasswordConfirm"
                            className="form-control"
                            placeholder="input.passwordConfirm"
                            onChange={this.handleChange}
                            value={this.state.passwordConfirm}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-6">
                        <FormattedMessage
                            tagName="label"
                            id="input.firstname"
                            className="control-label"
                            htmlFor="inputFirstName"
                        />
                        <FormattedInput
                            type="text"
                            id="inputFirstName"
                            className="form-control"
                            placeholder="input.firstname"
                            onChange={this.handleChange}
                            value={this.state.firstName}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <FormattedMessage
                            tagName="label"
                            id="input.lastname"
                            className="control-label"
                            htmlFor="inputLastName"
                        />
                        <FormattedInput
                            type="text"
                            id="inputLastName"
                            className="form-control"
                            placeholder="input.lastname"
                            onChange={this.handleChange}
                            value={this.state.lastName}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-12">
                        <button className="btn btn-primary pull-right" onClick={this.sendData}><FormattedMessage
                            id="button.user.create"
                        />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

UserManagementAddNew.propTypes = {
    sendData: PropTypes.func.isRequired,
};
