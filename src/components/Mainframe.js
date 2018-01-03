import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {addLocaleData, IntlProvider} from "react-intl";
import intlEN from "react-intl/locale-data/en";
import intlDE from "react-intl/locale-data/de";
import {logoutUser, openPasswordModal, probeToken} from "../actions";
import {getToken, getItem, setItem, toggleItem} from "./../utilities/storage";
import Header from "./Header";
import Sitebar from "./Sitebar";
import Notifications from "./Notifications";
import en from "../i18n/messages_en.json";
import de from "../i18n/messages_de.json";
import Progress from "./Progress";
import Home from "./../views/Home";
import Login from "./../views/Login";
import Recordings from "./../views/Recordings";
import BiometricProfiles from "./../views/BiometricProfiles";
import Matchlist from "./../views/Matchlist";
import Matchall from "./../views/Matchall";
import Fileimport from "./../views/Fileimport";
import Joblist from "./../views/Joblist";
import Importsettings from "./../views/Importsettings";
import Usersettings from "../views/UserManagement";
import Organisationsettings from "./../views/Organisationsettings";
import Categorysettings from "./../views/Categorysettings";
import License from "./../views/License";
import PasswordChangeModal from "./modals/PasswordChangeModal";
import SelectIconModal from "./../components/modals/SelectIconModal";
import RightManagement from "./../components/RightManagement";

addLocaleData([...intlEN, ...intlDE]);


class Mainframe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sitebar: getItem("sitebar") ? getItem("sitebar") : false,
            lang: getItem("language") ? getItem("language") : "de",
            showPasswordModal: false,
        };

        getToken("auth_token") && this.checkToken();
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {isAuthenticated} = nextProps;
        const profile = nextProps.auth.user;

        if (isAuthenticated && profile.expired) {
            this.props.dispatch(openPasswordModal(profile, "static"));
        }
        if (isAuthenticated && (isAuthenticated !== this.props.isAuthenticated)) {
            this.checkToken();
        }
    }

    checkToken() {
        this.props.dispatch(probeToken());
    }

    changeLanguage(selectedLanguage) {
        this.setState({lang: selectedLanguage});
        setItem("language", selectedLanguage);
    }

    toggleMenu() {
        toggleItem("sitebar");
        this.setState({
            sitebar: getItem("sitebar"),
        });
    }

    render() {
        const {dispatch, auth, isAuthenticated} = this.props;
        const {showPasswordModal} = this.state;
        const profile = isAuthenticated ? auth.user : {};
        const passwordExpired = isAuthenticated ? profile.expired : true;
        const showNavigation = !passwordExpired && isAuthenticated;
        const localeMessages = Object.assign({}, en, de);
        const langMsg = localeMessages[this.state.lang];

        let content = "";

        if (isAuthenticated === false || isAuthenticated === undefined) {
            content = <Route component={Login} />;
        } else if (passwordExpired) {
            content = <Route exact path="/" component={Home} />;
        } else {
            content = (
                <div className={(this.state.sitebar === true) ? "show container-fluid" : "container-fluid"}>
                    <Route exact path="/login" render={() => (<Redirect to="/" />)} />
                    <Route exact path="/" component={Home} />
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
            );
        }

        return (
            <IntlProvider locale={this.state.lang} messages={langMsg}>
                <Router>
                    <div className="mainframe container">
                        <Notifications />
                        <Header
                            changeLanguage={this.changeLanguage}
                            lang={langMsg}
                            language={this.state.lang}
                            logoutUser={() => dispatch(logoutUser())}
                            toggleMenu={() => this.toggleMenu()}
                        />
                        <Progress />
                        {(showNavigation) && <Sitebar show={this.state.sitebar} />}

                        {content}
                        <PasswordChangeModal modal={showPasswordModal} />
                        <SelectIconModal />
                        <RightManagement />
                    </div>
                </Router>
            </IntlProvider>
        );
    }
}

Mainframe.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {auth, tokenIsValid} = state;
    const {isAuthenticated} = auth;

    return {
        auth,
        tokenIsValid,
        isAuthenticated,
    };
}

export default connect(mapStateToProps)(Mainframe);
