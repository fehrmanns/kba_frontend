import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import FormattedInput from "../components/i18n/FormattedInput";
import {updateUser, probeToken} from "../actions";
import "./../css/login.css";

class PasswordReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            passwordConfirm: "",
            passwordIsValid: true,
            passwordIsEqual: true,
        };

        this.handleChange = this.handleChange.bind(this);
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
        console.log("user", this.props.auth.user);
        const userUpdate = Object.assign({}, this.props.auth.user, {password: this.state.password});
        dispatch(updateUser(userUpdate)).then(dispatch(probeToken()));
    }


    render() {
        const passwordError = !this.state.passwordIsValid;
        const passwordEqualError = !this.state.passwordIsEqual;

        return (
            <div className="flex-container">

                <form className="form-password-change form-horizontal" onSubmit={this.handleSubmit.bind(this)}>

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
            </div>
        );
    }
}


PasswordReset.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {auth} = state;

    return {
        auth,
    };
}

export default connect(mapStateToProps)(PasswordReset);
