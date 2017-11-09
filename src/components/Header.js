import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import FormattedDropDown from './FormattedDropDown'


class Header extends React.Component {

    render() {
        const { renderOnLogin } = this.props

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        {renderOnLogin &&
                            <button type="button" className="navbar-toggle collapsed" onClick={() => this.props.toggleMenu()}>
                                <span className="sr-only"><FormattedMessage id="header.button.togglenavigation" /></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>}


                        <Link className="navbar-brand" to="/"><FormattedMessage id="header.title" /></Link>
                        
                        <DropdownButton bsStyle="default" title={this.props.language} key={this.props.language} id={`dropdown-basic-${this.props.language}`} onSelect={(eventKey) => this.props.changeLanguage(eventKey)}>
                            {//TODO: LOG
                            console.log("Language:", this.props.language)
                            }
                            <MenuItem eventKey="en"><FormattedMessage id="header.dropdown.language.en" /></MenuItem>
                            <MenuItem eventKey="de"><FormattedMessage id="header.dropdown.language.de" /></MenuItem>                            
                        </DropdownButton>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header