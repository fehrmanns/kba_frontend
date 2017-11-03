import React from 'react'
import { Link } from 'react-router-dom'
import './sitebar.css'

class Sitebar extends React.Component {

    render() {
        return (

            <div className={(this.props.show === "true") ? 'show sitebar' : 'sitebar'}>
                <ul>
                    <li>
                        <Link to="/">Recordings</Link>
                    </li>
                    <li>
                        <Link to="/about">Profiles</Link>
                    </li>
                    <li>
                        <Link to="/topics">Matchinglist</Link>
                    </li>
                    <li>
                        <Link to="/topics">Match All</Link>
                    </li>
                </ul>
                <hr />
                <ul>
                    <li>
                        <Link to="/">File Import</Link>
                    </li>
                    <li>
                        <Link to="/about">Importlist</Link>
                    </li>
                </ul>
                <hr />
                <ul>
                    <li>
                        <Link to="/">Import Settings</Link>
                    </li>
                    <li>
                        <Link to="/about">User Settings</Link>
                    </li>
                    <li>
                        <Link to="/topics">Organisation Settings</Link>
                    </li>
                    <li>
                        <Link to="/topics">Category Settings</Link>
                    </li>
                    <li>
                        <Link to="/topics">License</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sitebar