import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import FormattedInput from "./i18n/FormattedInput";
import { updateUserPassword, closePasswordModal, setExpiredValue } from '../actions';

class PasswordChangeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            passwordConfirm: "",
            passwordIsValid: true,
            passwordIsEqual: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        const targetName = event.target.id.replace("input", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase());

        switch (targetName) {
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

    handleSubmit(event) {
        event.preventDefault();

        const passwordIsValid = !!this.state.password;
        const passwordIsEqual = (!!this.state.passwordConfirm) && (this.state.passwordConfirm === this.state.password);
        this.setState({
            passwordIsValid,
            passwordIsEqual,
        });
        const isValid = passwordIsValid && passwordIsEqual;

        if (!isValid) return;

        this.sendData();
    }

    sendData() {
        const {dispatch} = this.props;
        const user = (this.props.user.loginName) ? this.props.user : this.props.auth.user;
        const userUpdate = Object.assign({}, user, {password: this.state.password});
        dispatch(updateUserPassword(userUpdate)).then(() => dispatch(setExpiredValue())).then(() => dispatch(closePasswordModal()));
    }


    render() {
        const passwordError = !this.state.passwordIsValid;
        const passwordEqualError = !this.state.passwordIsEqual;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <h2 className="form-password-change-heading">
                    <FormattedMessage id="passwordreset.input.heading" />
                </h2>

                <div className="col-xs-12">
                    <div className={passwordError ? "form-group has-error" : "form-group"}>
                        <label className="control-label" htmlFor="inputPassword">
                            <FormattedMessage id="input.newPassword" />&nbsp;
                            {passwordError && <FormattedMessage id="input.passwordError" />}
                        </label>
                        <FormattedInput
                            type="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="input.password"
                            required=""
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className={passwordEqualError ? "form-group has-error" : "form-group"}>
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
                <button className="btn btn-primary btn-block" type="submit">
                    <FormattedMessage id="button.submit" />
                </button>
            </form>
        );
    }
}


PasswordChangeForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {auth, modals} = state;
    const {user} = modals;

    return {
        auth,
        user,
    };
}

export default connect(mapStateToProps)(PasswordChangeForm);
