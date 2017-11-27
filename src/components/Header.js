import React from "react";
import { injectIntl, intlShape } from "react-intl";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { MenuItem } from "react-bootstrap";
import FormattedDropDown from "./i18n/FormattedDropDown";
import "./../css/header.css";

class Header extends React.Component {
    render() {
        const locale = this.props.intl.locale;
        const dropDownId = `header.dropdown.language.${locale}`;
        const { renderOnLogin } = this.props;

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        { renderOnLogin &&
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
                        { renderOnLogin && <button className="btn btn-link" onClick={() => this.props.logoutUser()}><FormattedMessage id="header.button.logout" /></button> }
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(Header);
