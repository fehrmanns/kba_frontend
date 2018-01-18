import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage, FormattedDate, FormattedTime} from "react-intl";

class JobInfoDialog extends React.Component {
    render() {
        const {job} = this.props;
        const isGroup = !!job.groupName;
        const state = isGroup ? job.groupState : job.kbaJobStatus;
        return (
            <div className="jobinfo">
                <div className="row">
                    <div className="col-sm-12">
                        <FormattedMessage tagName="h3" id="joblist.jobinfo.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FormattedMessage
                            tagName="label"
                            id="label.name"
                            className="control-label"
                        />
                    </div>
                    <div className="col-sm-8">
                        <span>{job.name}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FormattedMessage
                            tagName="label"
                            id="label.enginesetting"
                            className="control-label"
                        />
                    </div>
                    <div className="col-sm-8">
                        <span>{job.kbaEngineSettingsName}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FormattedMessage
                            tagName="label"
                            id="label.organisation"
                            className="control-label"
                        />
                    </div>
                    <div className="col-sm-8">
                        <span>{job.kbaOuName}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FormattedMessage
                            tagName="label"
                            id="label.filename"
                            className="control-label"
                        />
                    </div>
                    <div className="col-sm-8">
                        <span>{job.kbaImportFilePath}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FormattedMessage
                            tagName="label"
                            id="label.createdby"
                            className="control-label"
                        />
                    </div>
                    <div className="col-sm-8">
                        <span>{job.createdBy}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FormattedMessage
                            tagName="label"
                            id="label.created"
                            className="control-label"
                        />
                    </div>
                    <div className="col-sm-8">
                        <span>
                            {!!job.created && <span><FormattedDate value={job.created} day="2-digit" month="2-digit" year="numeric" /> <FormattedTime value={job.created} hour="numeric" minute="numeric" second="numeric" /></span>}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FormattedMessage
                            tagName="label"
                            id="label.state"
                            className="control-label"
                        />
                    </div>
                    <div className="col-sm-8">
                        <span>{state ? <FormattedMessage id={state} /> : ""}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FormattedMessage
                            tagName="label"
                            id="label.description"
                            className="control-label"
                        />
                    </div>
                    <div className="col-sm-8">
                        <span>{job.description}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FormattedMessage
                            tagName="label"
                            id="label.journal"
                            className="control-label"
                        />
                    </div>
                    <div className="col-sm-8">
                        {job.journal ?
                            <textarea rows="10" cols="50" className="journal" disabled="true">{job.journal}</textarea>
                            :
                            <span />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

JobInfoDialog.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobInfoDialog;
