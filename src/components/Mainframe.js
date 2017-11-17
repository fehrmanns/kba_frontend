import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logoutUser, probeToken} from '../actions'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Routes from './Routes'
import Login from './../views/Login'
import Header from './Header'
import Sitebar from './Sitebar'
import Notifications from './Notifications'
import {toggleItem as toggleSitebar, getItem as getStorage} from './../utilities/storage'
import {addLocaleData, IntlProvider} from 'react-intl';
import intlEN from 'react-intl/locale-data/en';
import intlDE from 'react-intl/locale-data/de';
import en from '../i18n/messages_en.json';
import de from '../i18n/messages_de.json';
import Progress from "./Progress";

addLocaleData([...intlEN, ...intlDE]);


class Mainframe extends React.Component {

    constructor(props) {
        super(props);

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
        const {dispatch, auth, isAuthenticated} = this.props;
        const localeMessages = Object.assign({}, en, de);
        const langMsg = localeMessages[this.state.lang];


        return (
            <IntlProvider locale={this.state.lang} messages={langMsg}>
                <Router>
                    <div className="mainframe container">
                        <Notifications/>
                        <Header changeLanguage={this.changeLanguage} lang={langMsg} language={this.state.lang}
                                logoutUser={() => dispatch(logoutUser())} toggleMenu={() => this.toggleMenu()}
                                renderOnLogin={isAuthenticated}/>
                        <div className="row">
                            <Progress isActive={false}/>
                        </div>
                        {isAuthenticated && <Sitebar show={this.state.sitebar}/>}

                        {isAuthenticated ?
                            <div className={(this.state.sitebar === "true") ? 'show container-fluid' : 'container-fluid'}>
                                <Routes isAuthenticated={isAuthenticated}/>
                            </div>
                            :
                            <Route path="/" render={() => <Login dispatch={dispatch} auth={auth}/>}/>
                        }
                    </div>
                </Router>
            </IntlProvider>
        )
    };
}

Mainframe.propTypes = {
    dispatch: PropTypes.func.isRequired,
    quote: PropTypes.string,
    auth: PropTypes.object.isRequired
};

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

    const {auth, tokenIsValid} = state;
    const {isAuthenticated} = auth;

    return {
        auth,
        tokenIsValid,
        isAuthenticated
    }
}

export default connect(mapStateToProps)(Mainframe)
