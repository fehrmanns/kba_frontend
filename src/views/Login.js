import React, { Component } from 'react'
import { loginUser } from '../actions'
import {FormattedMessage} from 'react-intl'
import FormattedInput from '../components/i18n/FormattedInput'
import './../css/login.css'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            showError: false
        }
    }

    componentWillReceiveProps(nextProps) {

        (!nextProps.auth.isFetching && !nextProps.auth.isAuthenticated) && Object.assign({}, this.setState({ showError: true }))
    }

    handleChange(event) {

        this.setState({ showError: false })
        const targetName = event.target.id.replace('input', '').toLowerCase();

        switch (targetName) {
            case 'username':
                this.setState({
                    username: event.target.value
                });
                break;
            case 'password':
                this.setState({
                    password: event.target.value
                });
                break;
            default:
                return
        }
    }

    handleSubmit(event) {

        event.preventDefault();
        this.sendData();
    }

    sendData() {

        const { dispatch } = this.props;
        const creds = {
            username: this.state.username,
            password: this.state.password
        }
        dispatch(loginUser(creds));
    }


    render() {
        const { showError } = this.state

        return (
            <div className="flex-container">

                <form className={showError ? "form-signin unauthorized" : "form-signin"} onSubmit={this.handleSubmit.bind(this)}>

                    <h2 className="form-signin-heading">
                        <FormattedMessage id="login.input.heading" />
                    </h2>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon glyphicon glyphicon-user" id="sizing-addon2" />
                            <FormattedInput type="text" id="inputUsername" className="form-control" placeholder="login.input.username" required="" autoFocus="" onChange={this.handleChange.bind(this)} value={this.state.username} />
                        </div>
                        <label htmlFor="inputUsername" className="sr-only">
                            <FormattedMessage id="login.input.username" />
                        </label>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon glyphicon glyphicon-asterisk" id="sizing-addon2" />
                            <FormattedInput type="password" id="inputPassword" className="form-control" placeholder="login.input.password" required="" onChange={this.handleChange.bind(this)} value={this.state.password} />
                        </div>
                        <label htmlFor="inputPassword" className="sr-only">
                            <FormattedMessage id="login.input.password" />
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
                        <FormattedMessage id="login.button.submit" />
                    </button>
                </form>

            </div>
        );
    }
}

export default Login
