import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {MenuItem} from "react-bootstrap";
import FormattedInput from "../components/i18n/FormattedInput";
import FormattedTypeahead from "../components/i18n/FormattedTypeahead";
import FormattedDropDown from "./i18n/FormattedDropDown";

class UserManagementAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginName: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordConfirm: "",
            roleName: "default",
            kbaOuNames: [],
            loginNameIsValid: true,
            passwordIsValid: true,
            passwordIsEqual: true,
            roleNameIsValid: true,
            kbaOuNamesIsValid: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
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

    handleUnitChange(item) {
        this.setState({
            kbaOuNames: item,
            kbaOuNamesIsValid: true,
        });
    }

    sendData(event) {
        event.preventDefault();

        const loginNameIsValid = !!this.state.loginName;
        const passwordIsValid = !!this.state.password;
        const roleNameIsValid = (this.state.roleName !== "default");
        const kbaOuNamesIsValid = (this.state.kbaOuNames.length !== 0);
        const passwordIsEqual = (!!this.state.passwordConfirm) && (this.state.passwordConfirm === this.state.password);

        this.setState({
            loginNameIsValid,
            roleNameIsValid,
            passwordIsValid,
            passwordIsEqual,
            kbaOuNamesIsValid,
        });
        const isValid = loginNameIsValid && roleNameIsValid && passwordIsValid && passwordIsEqual && kbaOuNamesIsValid;

        if (!isValid) return;

        const newUser = {...this.state};
        delete newUser.loginNameIsValid;
        delete newUser.roleNameIsValid;
        delete newUser.passwordConfirm;
        delete newUser.passwordIsValid;
        delete newUser.passwordIsEqual;
        delete newUser.kbaOuNamesIsValid;

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
            kbaOuNames: [],
            roleName: "default",
            loginNameIsValid: true,
            passwordIsValid: true,
            passwordIsEqual: true,
            roleNameIsValid: true,
            kbaOuNamesIsValid: true,
        });
    }

    render() {
        const roleDropDownTitleId = `dropdown.role.${this.state.roleName.toLowerCase()}`;
        const loginNameError = !this.state.loginNameIsValid;
        const roleNameError = !this.state.roleNameIsValid;
        const passwordError = !this.state.passwordIsValid;
        const passwordEqualError = !this.state.passwordIsEqual;
        const kbaOuNamesError = !this.state.kbaOuNamesIsValid;
        const {unitList} = this.props;
        const unitNames = unitList.map(item => item.name);

        return (
            <form className="highlight">
                <div className="row">
                    <div className="col-sm-12">
                        <FormattedMessage tagName="h3" id="usermanagement.addnew.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className={loginNameError ? "form-group has-error col-sm-6" : "form-group col-sm-6"}>
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
                    <div className={roleNameError ? "form-group has-error col-sm-6" : "form-group col-sm-6"}>
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
                    <div className={passwordError ? "form-group has-error col-sm-6" : "form-group col-sm-6"}>
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
                    <div className={passwordEqualError ? "form-group has-error col-sm-6" : "form-group col-sm-6"}>
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
                    <div className="form-group col-sm-6">
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
                    <div className="form-group col-sm-6">
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
                    <div className={kbaOuNamesError ? "form-group has-error col-sm-6" : "form-group col-sm-6"}>
                        <label className="control-label" htmlFor="parentKbaOuName">
                            <FormattedMessage id="input.KbaOuSelection" />&nbsp;
                            {kbaOuNamesError && <FormattedMessage id="input.notempty" />}
                        </label>
                        <FormattedTypeahead
                            id="parentKbaOuNameSelection"
                            clearButton
                            multiple
                            labelKey="name"
                            placeholder="input.KbaOuSelectionPlaceholder"
                            options={unitNames}
                            onChange={this.handleUnitChange}
                            selected={this.state.kbaOuNames}
                        />
                    </div>
                    <div className="form-group col-sm-6">
                        <button className="btn btn-primary pull-right label-margin" id="createNewUserButton" onClick={this.sendData}>
                            <FormattedMessage id="button.user.create" />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

UserManagementAddNew.propTypes = {
    sendData: PropTypes.func.isRequired,
    unitList: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const {units, unittypes} = state;
    const types = unittypes.list;
    const unitList = units.list;

    return {
        types, unitList,
    };
}
export default connect(mapStateToProps)(UserManagementAddNew);
