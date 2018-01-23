import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/de";
import {isInclusivelyBeforeDay, isInclusivelyAfterDay } from "react-dates";
import FormattedSingleDatePicker from "../../components/i18n/FormattedSingleDatePicker";
import "./../../css/react_dates_overrides.css";


class JoblistView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: moment().subtract(14, 'day'),
            toDate: moment(),
            toDateFocused: false,
            fromDateFocused: false,
        };

        this.getJobs = this.getJobs.bind(this);
        this.onFocusChanged = this.onFocusChanged.bind(this);
        this.updateFromDateRange = this.updateFromDateRange.bind(this);
        this.updateToDateRange = this.updateToDateRange.bind(this);
    }

    onFocusChanged(focused, prop) {
        this.setState({ [prop]: focused.focused});
    }

    getJobs(event) {
        event.preventDefault();
        const dateFrom = !this.state.fromDate ? "" : this.state.fromDate.startOf('day').format();
        const dateTo = !this.state.toDate ? "" : this.state.toDate.endOf('day').format();
        this.props.fetchJobs(dateFrom, dateTo);
    }

    updateFromDateRange(day) {
        const {toDate} = this.state;
        const maxDate = toDate || moment();
        return !isInclusivelyBeforeDay(day, maxDate);
    }

    updateToDateRange(day) {
        const {fromDate} = this.state;
        if (fromDate) {
            return !isInclusivelyBeforeDay(day, moment()) || !isInclusivelyAfterDay(day, fromDate);
        }
        return !isInclusivelyBeforeDay(day, moment());
    }

    render() {
        moment.locale(this.state.language);
        return (
            <div>
                <form className="highlight">
                    <div className="row">
                        <div className="form-group col-sm-4">
                            <FormattedMessage
                                tagName="label"
                                id="input.dateFrom"
                                className="control-label"
                            />
                            <FormattedSingleDatePicker
                                date={this.state.fromDate}
                                onDateChange={fromDate => this.setState({ fromDate })}
                                focused={this.state.fromDateFocused}
                                onFocusChange={focused => this.onFocusChanged(focused, "fromDateFocused")}
                                displayFormat={() => moment.localeData(this.state.language).longDateFormat("L")}
                                numberOfMonths={1}
                                hideKeyboardShortcutsPanel
                                isOutsideRange={day => this.updateFromDateRange(day)}
                                placeholder="input.dateFrom"
                            />
                        </div>
                        <div className="form-group col-sm-4">
                            <FormattedMessage
                                tagName="label"
                                id="input.dateTo"
                                className="control-label"
                            />
                            <FormattedSingleDatePicker
                                date={this.state.toDate}
                                onDateChange={toDate => this.setState({ toDate })}
                                focused={this.state.toDateFocused}
                                onFocusChange={focused => this.onFocusChanged(focused, "toDateFocused")}
                                displayFormat={() => moment.localeData(this.state.language).longDateFormat("L")}
                                numberOfMonths={1}
                                hideKeyboardShortcutsPanel
                                isOutsideRange={day => this.updateToDateRange(day)}
                                placeholder="input.dateTo"
                            />
                        </div>
                        <div className="form-group col-sm-4">
                            <button className="btn btn-primary pull-right label-margin" id="filterButton" onClick={this.getJobs}>
                                <FormattedMessage id="button.job.filter" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

JoblistView.propTypes = {
    fetchJobs: PropTypes.func.isRequired,
};

export default JoblistView;
