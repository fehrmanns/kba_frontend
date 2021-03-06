import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import { connect } from "react-redux";

import {Nav, NavItem } from "react-bootstrap";
import "./../css/joblist.css";
import JoblistView from "../components/joblist/JoblistView";
import JobTable from "../components/joblist/JobTable";
import { getAdminJobs, getOwnJobs, fetchGroupJobsForAdmin, fetchGroupJobsForUser, openJobInfoModal, refreshJobAdmin, refreshJobOwn, refreshGroupAdmin, refreshGroupOwn } from "../actions";
import { getItem, setItem } from '../utilities/storage';

class Joblist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeKey: getItem("joblist_activeKey") ? getItem("joblist_activeKey") : 1,
        };

        this.toggleView = this.toggleView.bind(this);
        this.fetchAdminJobs = this.fetchAdminJobs.bind(this);
        this.fetchOwnJobs = this.fetchOwnJobs.bind(this);
        this.fetchGroupJobsForAdmin = this.fetchGroupJobsForAdmin.bind(this);
        this.fetchGroupJobsForUser = this.fetchGroupJobsForUser.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.refreshJobAdmin = this.refreshJobAdmin.bind(this);
        this.refreshJobOwn = this.refreshJobOwn.bind(this);
        this.refreshGroupAdmin = this.refreshGroupAdmin.bind(this);
        this.refreshGroupOwn = this.refreshGroupOwn.bind(this);
    }

    toggleView(selectedKey) {
        setItem("joblist_activeKey", selectedKey);
        this.setState({
            activeKey: selectedKey,
        });
    }

    fetchAdminJobs(fromDate, toDate) {
        this.props.dispatch(getAdminJobs(fromDate, toDate));
    }
    fetchOwnJobs(fromDate, toDate) {
        this.props.dispatch(getOwnJobs(fromDate, toDate));
    }

    fetchGroupJobsForAdmin(group) {
        this.props.dispatch(fetchGroupJobsForAdmin(group));
    }
    fetchGroupJobsForUser(group) {
        this.props.dispatch(fetchGroupJobsForUser(group));
    }
    showInfo(item) {
        this.props.dispatch(openJobInfoModal(item));
    }

    refreshJobAdmin(job) {
        this.props.dispatch(refreshJobAdmin(job));
    }

    refreshJobOwn(job) {
        this.props.dispatch(refreshJobOwn(job));
    }
    refreshGroupAdmin(group) {
        this.props.dispatch(refreshGroupAdmin(group));
    }

    refreshGroupOwn(group) {
        this.props.dispatch(refreshGroupOwn(group));
    }

    render() {
        const {activeKey} = this.state;
        const {rights} = this.props;
        return (
            <div className="joblist">
                <div className="row">
                    <div className="col-md-12">
                        <FormattedMessage tagName="h1" id="view.joblist.title" />
                    </div>
                </div>
                <div className="row">
                    <nav className="navbar nav-content col-md-12">
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
                </div>
                { activeKey === 1 ?
                    <div>
                        <JoblistView fetchJobs={this.fetchOwnJobs} />
                        <JobTable jobs={this.props.listOwnJobs} fetchGroupJobs={this.fetchGroupJobsForUser} showInfo={this.showInfo} refreshJob={this.refreshJobOwn} refreshGroup={this.refreshGroupOwn} />
                    </div>
                    :
                    <div>
                        <JoblistView fetchJobs={this.fetchAdminJobs} />
                        <JobTable jobs={this.props.listAdminJobs} fetchGroupJobs={this.fetchGroupJobsForAdmin} showInfo={this.showInfo} refreshJob={this.refreshJobAdmin} refreshGroup={this.refreshGroupAdmin} />
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
