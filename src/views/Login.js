import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {injectIntl, FormattedMessage} from "react-intl";
import FormattedInput from "../components/i18n/FormattedInput";
import { loginUser } from "../actions";
import "./../css/login.css";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            showError: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // check if there is no difference in the input

        if (nextProps.auth.creds && (this.props.auth !== nextProps.auth)) {
            const userIsDifferent = this.state.username.localeCompare(nextProps.auth.creds.username);
            const passwordIsDifferent = this.state.password.localeCompare(nextProps.auth.creds.password);
            const inputIsDifferent = (userIsDifferent || passwordIsDifferent);

            (!inputIsDifferent && !nextProps.auth.isAuthenticated) && Object.assign({}, this.setState({showError: true}));
        }
    }

    handleChange(event) {
        const targetName = event.target.id.replace("input", "").toLowerCase();

        this.setState({
            [targetName]: event.target.value,
            showError: false,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendData();
    }

    sendData() {
        const {dispatch} = this.props;

        const creds = {
            username: this.state.username,
            password: this.state.password,
        };
        dispatch(loginUser(creds));
    }


    render() {
        const {showError} = this.state;

        return (
            <div className="flex-container">

                <form
                    className={showError ? "form-signin unauthorized" : "form-signin"}
                    onSubmit={this.handleSubmit}
                >

                    <h2 className="form-signin-heading">
                        <FormattedMessage id="login.input.heading" />
                    </h2>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon glyphicon glyphicon-user" id="sizing-addon2" />
                            <FormattedInput
                                type="text"
                                id="inputUsername"
                                className="form-control"
                                placeholder="input.username"
                                required=""
                                autoFocus=""
                                onChange={this.handleChange}
                                value={this.state.username}
                            />
                        </div>
                        <label htmlFor="inputUsername" className="sr-only">
                            <FormattedMessage id="input.username" />
                        </label>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon glyphicon glyphicon-asterisk" id="sizing-addon2" />
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
                        <label htmlFor="inputPassword" className="sr-only">
                            <FormattedMessage id="input.password" />
                        </label>
                    </div>
                    <div className="error-label text-right">
                        {showError &&
                        <span className="label label-danger">
                            <FormattedMessage id="login.label.fail" />
                        </span>
                        }
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">
                        <FormattedMessage id="button.submit" />
                    </button>
                </form>

            </div>
        );
    }
}


Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {auth, tokenIsValid} = state;
    const {isAuthenticated, isFetching} = auth;

    return {
        auth,
        tokenIsValid,
        isAuthenticated,
        isFetching,
    };
}

export default injectIntl(connect(mapStateToProps)(Login));
