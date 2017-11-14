import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser, probeToken } from '../actions'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Header from './Header'
import Sitebar from './Sitebar'
import Login from './../views/Login'
import Home from './../views/Home'
import Recordings from './../views/Recordings'
import BiometricProfiles from './../views/BiometricProfiles'
import Matchlist from './../views/Matchlist'
import Matchall from './../views/Matchall'
import Fileimport from './../views/Fileimport'
import Joblist from './../views/Joblist'
import Importsettings from './../views/Importsettings'
import Usersettings from './../views/Usersettings'
import Organisationsettings from './../views/Organisationsettings'
import Categorysettings from './../views/Categorysettings'
import License from './../views/License'
import { toggleItem as toggleSitebar, getItem as getStorage } from './../utilities/storage'
import { addLocaleData, IntlProvider } from 'react-intl';
import intlEN from 'react-intl/locale-data/en';
import intlDE from 'react-intl/locale-data/de';
import en from '../i18n/messages_en.json';
import de from '../i18n/messages_de.json';

addLocaleData([...intlEN, ...intlDE]);


class Mainframe extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            sitebar: getStorage("sitebar"),
            loginSuccess: false,
            lang: "de"
        };

        localStorage.getItem('auth_token') && this.checkToken();
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    checkToken() {

        this.props.dispatch(probeToken());
    }

    toggleMenu() {
        toggleSitebar("sitebar");
        this.setState({
            sitebar: getStorage("sitebar")
        })
    }

    changeLanguage(selectedLanguage) {
        this.setState({
            lang: selectedLanguage
        });
    }

    render() {
        const { dispatch, auth, isAuthenticated } = this.props
        const localeMessages = Object.assign({}, en, de)
        const langMsg = localeMessages[this.state.lang]
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                isAuthenticated ?
                    (<Component {...props} />)
                    :
                    (<Redirect to={{ pathname: '/login' }} />)
            )} />
        )


        return (
            <IntlProvider locale={this.state.lang} messages={langMsg}>
                <Router>
                    <div className="mainframe">
                        <Header changeLanguage={this.changeLanguage} lang={langMsg} language={this.state.lang} logoutUser={() => dispatch(logoutUser())} toggleMenu={() => this.toggleMenu()} renderOnLogin={isAuthenticated} />
                        <div className="progress">
                            <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                        {isAuthenticated && <Sitebar show={this.state.sitebar} />}

                        {isAuthenticated ?
                            <div className={(this.state.sitebar === "true") ? 'show container' : 'container'}>
                                <Route exact path="/login" render={() => (<Redirect to="/" />)} />
                                <PrivateRoute exact path="/" component={Home} />
                                <Route exact path="/recordings" component={Recordings} />
                                <Route exact path="/biometricprofiles" component={BiometricProfiles} />
                                <Route exact path="/matchlist" component={Matchlist} />
                                <Route exact path="/topics" component={Matchall} />
                                <Route exact path="/fileimport" component={Fileimport} />
                                <Route exact path="/joblist" component={Joblist} />
                                <Route exact path="/importsettings" component={Importsettings} />
                                <Route exact path="/usersettings" component={Usersettings} />
                                <Route exact path="/organisationsettings" component={Organisationsettings} />
                                <Route exact path="/categorysettings" component={Categorysettings} />
                                <Route exact path="/license" component={License} />
                            </div>
                            :
                            <Route path="/" render={() => <Login dispatch={dispatch} auth={auth} />} />
                        }

                    </div>
                </Router>
            </IntlProvider>)
    };
}
Mainframe.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    auth: PropTypes.object.isRequired
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

    const { auth, tokenIsValid } = state
    const { isAuthenticated } = auth

    return {
        auth,
        tokenIsValid,
        isAuthenticated
    }
}

export default connect(mapStateToProps)(Mainframe)
