import React from 'react'
import { Link } from 'react-router-dom'


class Header extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" onClick={() => this.props.toggleMenu()}>
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Klarios Biometrics Analytics</Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header