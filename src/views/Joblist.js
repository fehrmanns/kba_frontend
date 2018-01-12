import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import { connect } from "react-redux";

import {Nav, NavItem } from "react-bootstrap";
import "./../css/joblist.css";
import JoblistView from "../components/joblist/JoblistView";
import { getAdminJobs, getOwnJobs } from '../actions';

class Joblist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1,
        };

        this.toggleView = this.toggleView.bind(this);
        this.fetchAdminJobs = this.fetchAdminJobs.bind(this);
        this.fetchOwnJobs = this.fetchOwnJobs.bind(this);
    }

    toggleView(selectedKey) {
        this.setState({
            activeKey: selectedKey,
        });
    }

    fetchAdminJobs() {
        // TODO use date values
        this.props.dispatch(getAdminJobs());
    }
    fetchOwnJobs() {
        // TODO use date values
        this.props.dispatch(getOwnJobs());
    }


    render() {
        const {activeKey} = this.state;
        const {rights} = this.props;
        return (
            <div className="joblist">
                <nav className="navbar">
                    <Nav bsStyle="pills" activeKey={activeKey} onSelect={this.toggleView}>
                        { rights["own-jobs"].get &&
                            <NavItem eventKey={1}>
                                <FormattedMessage id="joblist.user.title" />
                            </NavItem>
                        }
                        {rights.jobs.get &&
                            <NavItem eventKey={2}>
                                <FormattedMessage id="joblist.administration.title" />
                            </NavItem>
                        }
                    </Nav>
                </nav>

                { activeKey === 1 ?
                    <div>
                        <JoblistView fetchJobs={this.fetchOwnJobs} />
                    </div>
                    :
                    <div>
                        <JoblistView fetchJobs={this.fetchAdminJobs} />
                    </div>
                }
            </div>
        );
    }
}

Joblist.propTypes = {
    rights: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {auth} = state;
    const {rights} = auth;
    return {
        rights,
    };
}

export default connect(mapStateToProps)(Joblist);
