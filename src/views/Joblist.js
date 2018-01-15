import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import { connect } from "react-redux";

import {Nav, NavItem } from "react-bootstrap";
import "./../css/joblist.css";
import JoblistView from "../components/joblist/JoblistView";
import JobTable from "../components/joblist/JobTable";
import { getAdminJobs, getOwnJobs } from "../actions";

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

    fetchAdminJobs(fromDate, toDate) {
        // TODO use date values
        this.props.dispatch(getAdminJobs(fromDate, toDate));
    }
    fetchOwnJobs(fromDate, toDate) {
        // TODO use date values
        this.props.dispatch(getOwnJobs(fromDate, toDate));
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
                        <JobTable jobs={this.props.listOwnJobs} />
                    </div>
                    :
                    <div>
                        <JoblistView fetchJobs={this.fetchAdminJobs} />
                        <JobTable jobs={this.props.listAdminJobs} />
                    </div>
                }
            </div>
        );
    }
}

Joblist.propTypes = {
    rights: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    listOwnJobs: PropTypes.array.isRequired,
    listAdminJobs: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const {auth, ownjoblist, adminjoblist} = state;
    const {rights} = auth;
    const listOwnJobs = ownjoblist.joblist;
    const listAdminJobs = adminjoblist.joblist;
    return {
        rights, listOwnJobs, listAdminJobs,
    };
}

export default connect(mapStateToProps)(Joblist);
