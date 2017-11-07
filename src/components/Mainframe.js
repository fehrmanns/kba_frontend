import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import Sitebar from './Sitebar'
import Login from './../views/Login'
import Home from './../views/Home'
import { toggleItem as toggleSitebar, getItem as getStorage } from './../utilities/storage'

class Mainframe extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            sitebar: getStorage("sitebar"),
            loginSuccess: false
        };
    }

    toggleMenu() {
        toggleSitebar("sitebar");
        this.setState({
            sitebar: getStorage("sitebar")
        })
    }


    render() {

        const { dispatch, isAuthenticated, errorMessage } = this.props
        const login = <Login dispatch={dispatch} errorMessage={errorMessage} />
        const application = (
            <div className={(this.state.sitebar === "true") ? 'show container' : 'container'}>
                <button onClick={() => dispatch(logoutUser())}>logout</button>
                <Route exact path="/" component={Home} />
            </div>
        )

        return (

            <Router>
                <div className="mainframe">
                    <Header toggleMenu={() => this.toggleMenu()} renderOnLogin={isAuthenticated} />
                    <div className="progress">
                        <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">45% Complete</span>
                        </div>
                    </div>

                    {isAuthenticated && <Sitebar show={this.state.sitebar} />}
                    {isAuthenticated ? application : login}
                </div>
            </Router>
        )
    };
}
Mainframe.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

    const { quotes, auth } = state
    const { quote, authenticated } = quotes
    const { isAuthenticated, errorMessage } = auth

    return {
        quote,
        isSecretQuote: authenticated,
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(Mainframe)
