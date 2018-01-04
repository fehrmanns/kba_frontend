import React from "react";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./../css/sitebar.css";

class Sitebar extends React.Component {

    render() {
        const {rights} = this.props;
        return (
            <div className={(this.props.show === true) ? "show sitebar" : "sitebar"}>
                <ul>
                    <li>
                        <Link to="/recordings"><FormattedMessage id="menu.sitebar.recordings" /></Link>
                    </li>
                    <li>
                        <Link to="/biometricprofiles"><FormattedMessage id="menu.sitebar.biometricprofiles" /></Link>
                    </li>
                    <li>
                        <Link to="/matchlist"><FormattedMessage id="menu.sitebar.matchlist" /></Link>
                    </li>
                    <li>
                        <Link to="/topics"><FormattedMessage id="menu.sitebar.matchall" /></Link>
                    </li>
                </ul>
                <hr />
                <ul>
                    <li>
                        <Link to="/fileimport"><FormattedMessage id="menu.sitebar.import.manual" /></Link>
                    </li>
                    <li>
                        <Link to="/"><FormattedMessage id="menu.sitebar.import.k2" /></Link>
                    </li>
                    <li>
                        <Link to="/joblist"><FormattedMessage id="menu.sitebar.import.jobs" /></Link>
                    </li>
                </ul>
                <hr />
                <ul>
                    <li>
                        <Link to="/importsettings"><FormattedMessage id="menu.sitebar.settings.import" /></Link>
                    </li>
                    {(rights.users.hasPermissions()) &&
                    <li>
                        <Link to="/usersettings"><FormattedMessage id="menu.sitebar.settings.user" /></Link>
                    </li>
                    }
                    {(rights["org-units"].hasPermissions() || rights["org-unit-types"].hasPermissions()) &&
                    <li>
                        <Link to="/organisationsettings"><FormattedMessage
                            id="menu.sitebar.settings.organisation"
                        />
                        </Link>
                    </li>
                    }
                    <li>
                        <Link to="/categorysettings"><FormattedMessage id="menu.sitebar.settings.category" /></Link>
                    </li>
                    <li>
                        <Link to="/license"><FormattedMessage id="menu.sitebar.settings.license" /></Link>
                    </li>
                </ul>
            </div>
        );
    }
}

Sitebar.propTypes = {
    show: PropTypes.bool.isRequired,
    rights: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {auth} = state;
    const {rights} = auth;

    return {
        rights,
    };
}

export default connect(mapStateToProps)(Sitebar);
