import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Sitebar from './Sitebar'
import Login from './Login'
import Home from './../views/Home'
import Recordings from './../views/Recordings'
import Profiles from './../views/Profiles'
import Matchlist from './../views/Matchlist'
import Matchall from './../views/Matchall'
import Fileimport from './../views/Fileimport'
import Importlist from './../views/Importlist'
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
import {FormattedMessage} from 'react-intl';

addLocaleData([...intlEN, ...intlDE]);

class Mainframe extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            sitebar: getStorage("sitebar"),
            loginSuccess: false,
            lang: "de"
        };

        this.changeLanguage = this.changeLanguage.bind(this);
    }

    toggleMenu() {
        toggleSitebar("sitebar");
        this.setState({
            sitebar: getStorage("sitebar")
        })
    }

    changeLanguage(selectedLanguage){
        console.log("current Language", (this !== null) ? this.state.lang : "NULL");
        this.setState({
            lang: selectedLanguage
        });
        console.log("selectedLanguage:", selectedLanguage)
    }

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props

        return (
            <IntlProvider key={lang} locale={lang} messages={langMsg}>
                <Router>
                    <div className="mainframe">
                        <Header toggleMenu={() => this.toggleMenu()} renderOnLogin={isAuthenticated} />
                        <div className="progress">
                            <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">45% Complete</span>
                            </div>
                        </div>
                        {isAuthenticated && <Sitebar show={this.state.sitebar} />}

                        <Switch>
                            <Route path="/" render={() => <Login dispatch={dispatch} errorMessage={errorMessage} />} />
                            <div className={(this.state.sitebar === "true") ? 'show container' : 'container'}>
                                <button onClick={() =>  (logoutUser())}><FormattedMessage id="header.button.logout"/></button>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/recordings" component={Recordings} />
                                <Route exact path="/profiles" component={Profiles} />
                                <Route exact path="/matchlist" component={Matchlist} />
                                <Route exact path="/topics" component={Matchall} />
                                <Route exact path="/fileimport" component={Fileimport} />
                                <Route exact path="/importlist" component={Importlist} />
                                <Route exact path="/importsettings" component={Importsettings} />
                                <Route exact path="/usersettings" component={Usersettings} />
                                <Route exact path="/organisationsettings" component={Organisationsettings} />
                                <Route exact path="/categorysettings" component={Categorysettings} />
                                <Route exact path="/license" component={License} />
                            </div>
                        </Switch>

        const localeMessages = Object.assign({}, en, de)
        console.log("localeMessages:", localeMessages);
        const langMsg = localeMessages[this.state.lang];
        console.log("lanMsg:", langMsg);

        return (
            <IntlProvider key={this.state.lang} locale={this.state.lang} messages={langMsg}>
                <Router>
                    <div className="mainframe">
                        <Header changeLanguage={this.changeLanguage} language={this.state.lang} toggleMenu={() => this.toggleMenu()} renderOnLogin={isAuthenticated} />
                        <div className="progress">
                            <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only">45% Complete</span>
                            </div>
                        </div>

                        {isAuthenticated && <Sitebar show={this.state.sitebar} />}
                        {isAuthenticated ? application : login}
                    </div>
                </Router>
            </IntlProvider>)
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
