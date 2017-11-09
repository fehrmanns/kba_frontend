import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { MenuItem } from 'react-bootstrap'
import './../css/header.css'
import FormattedDropDown from './FormattedDropDown'


class Header extends React.Component {

    render() {
        const { renderOnLogin } = this.props

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        { renderOnLogin &&
                            <button type="button" className="navbar-toggle collapsed" onClick={() => this.props.toggleMenu()}>
                                <span className="sr-only"><FormattedMessage id="header.button.togglenavigation" /></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        }
                        <Link className="navbar-brand" to="/"><FormattedMessage id="header.title" /></Link>
                    </div>
                    <div className="button-container pull-right">
                        <FormattedDropDown pullRight bsStyle="link" locale={this.props.language} onSelect={(eventKey) => this.props.changeLanguage(eventKey)}>
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

export default Header
