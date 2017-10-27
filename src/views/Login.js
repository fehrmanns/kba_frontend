import React, { Component } from 'react'
/*
{window.btoa( "Baumhaus" )}
*/
const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';
/* Login Uniform Resource Identifier */
// eslint-disable-next-line
const LURI = 'http://localhost:8080/kba_backend_frontend/rest/login';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hits: []
        }
    }

    componentDidMount() {
        fetch(API + DEFAULT_QUERY)
          .then( response => response.json() )
          .then( data => this.setState({ hits: data.hits }) )
          .then( () => console.log( "we have: " + JSON.stringify(this.state.hits) ) )
          .catch( () => console.log( "error" ) );
      }

    render() {
        return (
            <div className="flex-container">

                <form className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">Sign in</button>
                </form>

            </div>
        );
    }
}

export default Login