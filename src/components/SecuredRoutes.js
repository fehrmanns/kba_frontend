import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class SecuredRoutes extends React.Component {

    requireAuth = (nextState, replace) => {
        console.log("status", nextState);
        if (this.props.auth.isAuthenticated) {
            // Redirect to login
            replace({ pathname: '/login' })
        }
    };

    render() {

        return (
            <Route path="/" onEnter={() => this.requireAuth()} >
                {this.props.children}
            </Route>
        )
    }
}
