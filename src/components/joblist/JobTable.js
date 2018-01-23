import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import JobTableItem from "./JobTableItem";


class JobTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: this.props.jobs,
        };
    }

    componentWillReceiveProps(nextProps) {
        (nextProps.jobs !== this.state.jobs) && this.setState({jobs: nextProps.jobs});
    }

    render() {
        const jobList = this.props.jobs;

        return (
            <div className="category-list">
                {jobList ?
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>{/* placeholder for expand group icon */}</th>
                                <th><FormattedMessage id="joblist.list.name" /></th>
                                <th><FormattedMessage id="joblist.list.files" /></th>
                                <th><FormattedMessage id="joblist.list.enginesetting" /></th>
                                <th><FormattedMessage id="joblist.list.importdate" /></th>
                                <th><FormattedMessage id="joblist.list.creator" /></th>
                                <th><FormattedMessage id="joblist.list.progress" /></th>
                                <th><FormattedMessage id="joblist.list.status" /></th>
                                <th><FormattedMessage id="joblist.list.jobtype" /></th>
                                <th>{/* placeholder for button */}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobList.map(item => <JobTableItem item={item} key={`JobItem.${item.name.replace(/\b[a-z]/g, letter => letter.toUpperCase()).replace(" ", "")}`} fetchGroupJobs={this.props.fetchGroupJobs} showInfo={this.props.showInfo} refreshJob={this.props.refreshJob} refreshGroup={this.props.refreshGroup} />)
                            }
                        </tbody>
                    </table>
                    :
                    <div className="loader">Loading...</div>
                }
            </div>
        );
    }
}

JobTable.propTypes = {
    fetchGroupJobs: PropTypes.func.isRequired,
    refreshJob: PropTypes.func.isRequired,
    refreshGroup: PropTypes.func.isRequired,
    showInfo: PropTypes.func.isRequired,
    jobs: PropTypes.array.isRequired,
};

export default JobTable;
