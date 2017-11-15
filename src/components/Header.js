import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { MenuItem } from 'react-bootstrap'
import LanguageDropDown from './i18n/LanguageDropDown'
import './../css/header.css'

class Header extends React.Component {

    render() {
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
                        <LanguageDropDown pullRight bsStyle="link" onSelect={(eventKey) => this.props.changeLanguage(eventKey)}>
                            <MenuItem eventKey="en"><FormattedMessage id="header.dropdown.language.en" /></MenuItem>
                            <MenuItem eventKey="de"><FormattedMessage id="header.dropdown.language.de" /></MenuItem>
                        </LanguageDropDown>
                        { renderOnLogin && <button className="btn btn-link" onClick={() => this.props.logoutUser()}><FormattedMessage id="header.button.logout" /></button> }
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header
