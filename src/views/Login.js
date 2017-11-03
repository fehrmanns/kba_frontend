import React, { Component } from 'react'
import './login.css'; 

/* Login Uniform Resource Identifier */
const LURI = 'http://localhost:8080/befe/rest/login';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            data: '',
            signinClass: "form-signin"
        }

        this.handleErrors = this.handleErrors.bind(this);
    }

    componentDidMount() {
        /*
        fetch(API + DEFAULT_QUERY)
            .then(response => response.json())
            .then(data => this.setState({ hits: data.hits }))
            .then(() => console.log("we have: " + JSON.stringify(this.state.hits)))
            .catch(() => console.log("error"));
        */
    }

    handleChange(event) {

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

        this.setState({
            signinClass: "form-signin"
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        this.sendData();
    }

    sendData() {

        const encodeLogin = "Basic " + btoa(this.state.username + ":" + this.state.password);
        let loginHeader = new Headers();
        loginHeader.append("authentication", encodeLogin);

        var fetchInit = {
            method: 'GET',
            headers: loginHeader,
            mode: 'none'
        };

        fetch(LURI, fetchInit)
            .then(this.handleErrors)
            .then(response => console.log("ok"));
    }

    handleErrors(response) {
        if (!response.ok) {
            //throw Error(response.statusText);
            this.setState({
                signinClass: this.state.signinClass + " " + response.statusText.toLowerCase()
            })
        }
        return response;
    }

    render() {
        return (
            <div className="flex-container">

                <form className={this.state.signinClass} onSubmit={this.handleSubmit.bind(this)}>
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon glyphicon glyphicon-user" id="sizing-addon2"></span>
                            <input type="text" id="inputUsername" className="form-control" placeholder="User name" required="" autoFocus="" onChange={this.handleChange.bind(this)} value={this.state.username} />
                        </div>
                        <label htmlFor="inputUsername" className="sr-only">User name</label>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon glyphicon glyphicon-asterisk" id="sizing-addon2"></span>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" onChange={this.handleChange.bind(this)} value={this.state.password} />
                        </div>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">Sign in</button>
                </form>

            </div>
        );
    }
}

export default Login