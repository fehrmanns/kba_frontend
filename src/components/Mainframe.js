import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loginUser, logoutUser, probeToken} from '../actions'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Routes from './Routes'
import Login from './../views/Login'
import RestPassword from './../views/RestPassword'
import Header from './Header'
import Sitebar from './Sitebar'
import Notifications from './Notifications'
import {toggleItem, getItem, setItem} from './../utilities/storage'
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
            sitebar: getItem("sitebar"),
            lang: getItem("language") ? getItem("language") : "de"
        };

        localStorage.getItem('auth_token') && this.checkToken();
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    checkToken() {
        this.props.dispatch(probeToken())
    }

    changeLanguage(selectedLanguage) {
        this.setState({lang: selectedLanguage});
        setItem("language", selectedLanguage);
    }

    toggleMenu() {
        toggleItem("sitebar");
        this.setState({
            sitebar: getItem("sitebar")
        })
    }


    render() {
        const {dispatch, auth, isAuthenticated} = this.props;
        const profile = isAuthenticated ? JSON.parse(localStorage.getItem('profile')) : {};
        const passwordExpired = isAuthenticated ? profile["expired"] : true;
        const localeMessages = Object.assign({}, en, de);
        const langMsg = localeMessages[this.state.lang];

        return (
            <IntlProvider locale={this.state.lang} messages={langMsg}>
                <Router>
                    <div className="mainframe container">
                        <Notifications messages={this.state.messages}/>
                        <Header changeLanguage={this.changeLanguage} lang={langMsg} language={this.state.lang}
                                logoutUser={() => dispatch(logoutUser())} toggleMenu={() => this.toggleMenu()}
                                renderOnLogin={isAuthenticated}/>
                        <Progress isActive={false}/>
                        {(isAuthenticated) && <Sitebar show={this.state.sitebar}/>}

                        {/*
                            <Route path="/" render={() => <RestPassword dispatch={dispatch} user={profile}/>}/>
                        */}
                        <div className={(this.state.sitebar === true) ? 'show container-fluid' : 'container-fluid'}>
                            <Routes dispatch={dispatch} auth={auth} loginUser={loginUser}/>
                        </div>
                    </div>
                </Router>
            </IntlProvider>
        )
    };
}

Mainframe.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

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
