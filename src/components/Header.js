import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {injectIntl, intlShape, FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {MenuItem} from "react-bootstrap";
import {openPasswordModal} from "./../actions";
import {getLoginName} from "./../utilities/storage";
import FormattedDropDown from "./i18n/FormattedDropDown";
import FormattedButton from "./i18n/FormattedButton";
import "./../css/header.css";

class Header extends React.Component {
    render() {
        const {locale} = this.props.intl;
        const {dispatch, user} = this.props;
        const dropDownId = `header.dropdown.language.${locale}`;
        const renderOnLogin = this.props.isAuthenticated;
        const username = getLoginName();

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        {renderOnLogin &&
                        <button type="button" className="navbar-toggle collapsed" onClick={() => this.props.toggleMenu()}>
                            <span className="sr-only"><FormattedMessage id="header.button.togglenavigation" /></span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        }
                        <Link className="navbar-brand" to="/"><FormattedMessage id="header.title" /></Link>
                    </div>
                    <div id="usermenu" className="button-container pull-right">
                        <FormattedDropDown pullRight bsStyle="link" id="intl.locale.selection" titleId={dropDownId} onSelect={eventKey => this.props.changeLanguage(eventKey)}>
                            <MenuItem eventKey="en"><FormattedMessage id="header.dropdown.language.en" /></MenuItem>
                            <MenuItem eventKey="de"><FormattedMessage id="header.dropdown.language.de" /></MenuItem>
                        </FormattedDropDown>
                        {renderOnLogin &&
                            <FormattedButton
                                className="btn btn-link"
                                title="header.user.hint"
                                onClick={() => dispatch(openPasswordModal(user))}
                            >
                                <FormattedMessage id="header.user.label" />: {username}
                            </FormattedButton>
                        }
                        {renderOnLogin && <button className="btn btn-link" onClick={() => this.props.logoutUser()}><FormattedMessage id="header.button.logout" /></button>}
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    // eslint-disable-next-line react/no-typos
    intl: intlShape.isRequired,
    dispatch: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {auth} = state;
    const {isAuthenticated, user} = auth;

    return {
        auth,
        user,
        isAuthenticated,
    };
}

export default injectIntl(connect(mapStateToProps)(Header));
