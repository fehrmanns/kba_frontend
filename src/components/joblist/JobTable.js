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
                                <th><FormattedMessage id="categorymanagement.list.name" /></th>
                                <th><FormattedMessage id="categorymanagement.list.files" /></th>
                                <th><FormattedMessage id="categorymanagement.list.enginesetting" /></th>
                                <th><FormattedMessage id="categorymanagement.list.importdate" /></th>
                                <th><FormattedMessage id="categorymanagement.list.progress" /></th>
                                <th><FormattedMessage id="categorymanagement.list.status" /></th>
                                <th><FormattedMessage id="categorymanagement.list.jobtype" /></th>
                                <th>{/* placeholder for button */}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobList.map(item => <JobTableItem item={item} key={`JobItem.${item.name.replace(/\b[a-z]/g, letter => letter.toUpperCase()).replace(" ", "")}`} />)
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
    jobs: PropTypes.array.isRequired,
};

export default JobTable;
