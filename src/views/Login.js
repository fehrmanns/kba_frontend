import React from 'react'
/*
{window.btoa( "Baumhaus" )}
*/

class Login extends React.Component {

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