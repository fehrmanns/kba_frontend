import React from 'react'
import { Link } from 'react-router-dom'
import './../css/sitebar.css'
import {FormattedMessage} from 'react-intl';

class Sitebar extends React.Component {

    render() {
        return (

            <div className={(this.props.show === "true") ? 'show sitebar' : 'sitebar'}>
                <ul>
                    <li>
                        <Link to="/recordings"><FormattedMessage id="menu.sitebar.recordings"/></Link>
                    </li>
                    <li>
                        <Link to="/profiles"><FormattedMessage id="menu.sitebar.biometricprofiles"/></Link>
                    </li>
                    <li>
                        <Link to="/matchlist">Matchlist</Link>
                    </li>
                    <li>
                        <Link to="/topics">Match All</Link>
                    </li>
                </ul>
                <hr />
                <ul>
                    <li>
                        <Link to="/fileimport"><FormattedMessage id="menu.sitebar.import.manual"/></Link>
                    </li>
                    <li>
                        <Link to="/"><FormattedMessage id="menu.sitebar.import.k2"/></Link>
                    </li>
                    <li>
                        <Link to="/importlist"><FormattedMessage id="menu.sitebar.import.jobs"/></Link>
                    </li>
                </ul>
                <hr />
                <ul>
                    <li>
                        <Link to="/importsettings"><FormattedMessage id="menu.sitebar.settings.import"/></Link>
                    </li>
                    <li>
                        <Link to="/usersettings"><FormattedMessage id="menu.sitebar.settings.user"/></Link>
                    </li>
                    <li>
                        <Link to="/organisationsettings"><FormattedMessage id="menu.sitebar.settings.organisation"/></Link>
                    </li>
                    <li>
                        <Link to="/categorysettings"><FormattedMessage id="menu.sitebar.settings.category"/></Link>
                    </li>
                    <li>
                        <Link to="/license"><FormattedMessage id="menu.sitebar.settings.license"/></Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sitebar
