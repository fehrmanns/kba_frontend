import * as React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {Checkbox, MenuItem} from "react-bootstrap";
import FormattedInput from "../i18n/FormattedInput";
import FormattedDropDown from "../i18n/FormattedDropDown";
import * as constants from "../../utilities/constants";
import * as validator from "../../utilities/validator";

class EngineSettingAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            storagePolicy: "",
            keepPcmRawData: false,
            speakerNumRecognition: "",
            previewPicturePercent: 0,
            minScoreValueAudio: 0,
            minScoreValueVideo: 0,
            priority: null,
            nameIsValid: true,
            storagePolicyIsValid: true,
            speakerNumRecognitionIsValid: true,
            minScoreValueAudioIsValid: true,
            minScoreValueVideoIsValid: true,
            previewPicturePercentIsValid: true,
            priorityIsValid: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleStoragePolicySelection = this.handleStoragePolicySelection.bind(this);
        this.handleSpeakerSelection = this.handleSpeakerSelection.bind(this);
        this.handlePrioritySelection = this.handlePrioritySelection.bind(this);
        this.validateRange = this.validateRange.bind(this);
    }

    handleStoragePolicySelection(event) {
        this.setState({storagePolicy: event, storagePolicyIsValid: true});
    }

    handleSpeakerSelection(event) {
        this.setState({speakerNumRecognition: event});
    }

    handlePrioritySelection(event) {
        this.setState({priority: event});
    }

    handleChange(event) {
        event.preventDefault();
        const targetName = event.target.id.replace("input", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase());

        switch (targetName) {
            case "name":
                this.setState({
                    [targetName]: event.target.value,
                    nameIsValid: true,
                });
                break;
            case "description":
                this.setState({
                    [targetName]: event.target.value,
                });
                break;
            default:
                this.setState({
                    [targetName]: event.target.value,
                });
        }
    }

    sendData(event) {
        event.preventDefault();

        const nameIsValid = !!this.state.name;
        const storagePolicyIsValid = !!this.state.storagePolicy;
        const speakerNumRecognitionIsValid = !!this.state.speakerNumRecognition;
        const priorityIsValid = !(!this.state.priority && this.state.priority !== 0);
        this.setState({
            nameIsValid,
            storagePolicyIsValid,
            speakerNumRecognitionIsValid,
            priorityIsValid,
        });

        if (!nameIsValid || !storagePolicyIsValid || !speakerNumRecognitionIsValid || !this.state.minScoreValueAudioIsValid || !this.state.minScoreValueVideoIsValid || !this.state.previewPicturePercentIsValid || !priorityIsValid) return;

        const newSetting = {
            name: this.state.name,
            description: this.state.description,
            storagePolicy: this.state.storagePolicy ? this.state.storagePolicy : null,
            keepPcmRawData: this.state.keepPcmRawData,
            speakerNumRecognition: this.state.speakerNumRecognition ? this.state.speakerNumRecognition : null,
            priority: this.state.priority || this.state.priority === 0 ? this.state.priority : null,
            previewPicturePercent: this.state.previewPicturePercent,
            minScoreValueAudio: this.state.minScoreValueAudio,
            minScoreValueVideo: this.state.minScoreValueVideo,
        };

        this.props.sendData(newSetting);

        this.resetData();
    }

    resetData() {
        this.setState({
            name: "",
            description: "",
            storagePolicy: "",
            keepPcmRawData: false,
            speakerNumRecognition: "",
            previewPicturePercent: 0,
            minScoreValueAudio: 0,
            minScoreValueVideo: 0,
            priority: null,
            nameIsValid: true,
            storagePolicyIsValid: true,
            speakerNumRecognitionIsValid: true,
            minScoreValueAudioIsValid: true,
            minScoreValueVideoIsValid: true,
            previewPicturePercentIsValid: true,
            priorityIsValid: true,
        });
    }

    validateRange(event, attribute, min, max) {
        if (!validator.inRangeOrEmpty(event.target.value, min, max)) {
            this.setState({[attribute]: false});
            return false;
        }
        this.setState({[attribute]: true});
        return true;
    }


    render() {
        const nameError = !this.state.nameIsValid;
        const storagePolicyError = !this.state.storagePolicyIsValid;
        const speakerNumRecognitionError = !this.state.speakerNumRecognitionIsValid;
        const {storagePolicies, speakerNumRecognition, priorities} = constants;

        const storagepolicyDropDownTitleId = this.state.storagePolicy ? this.state.storagePolicy : "selection.storagepolicy";
        const speakerDropDownTitleId = this.state.speakerNumRecognition ? this.state.speakerNumRecognition : "selection.speaker";
        const priorityDropDownTitleId = this.state.priority || this.state.priority === 0 ? `dropdown.priority.${this.state.priority}` : "selection.policy";
        const scoreAudioError = !this.state.minScoreValueAudioIsValid;
        const scoreVideoError = !this.state.minScoreValueVideoIsValid;
        const picturePreviewError = !this.state.previewPicturePercentIsValid;
        const priorityError = !this.state.priorityIsValid;

        // TODO: checkbox state should change when text is clicked
        // TODO: change layout here (>1200px)
        return (
            <form className="highlight" onSubmit={this.sendData}>
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h3" id="enginesetting.addnew.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className={nameError ? "form-group has-error col-md-6" : "form-group col-md-6"}>
                        <label className="control-label" htmlFor="inputName">
                            <FormattedMessage id="input.settingname" />&nbsp;
                            {nameError && <FormattedMessage id="input.notempty" />}
                        </label>
                        <FormattedInput
                            type="text"
                            id="inputName"
                            className="form-control"
                            placeholder="input.settingname"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className={storagePolicyError ? "form-group has-error col-md-6" : "form-group col-md-6"}>
                        <label className="control-label" htmlFor="inputStoragepolicy">
                            <FormattedMessage id="input.storagepolicy" />&nbsp;
                            {storagePolicyError && <FormattedMessage id="dropdown.error" />}
                        </label>
                        <br />
                        <FormattedDropDown
                            titleId={storagepolicyDropDownTitleId}
                            id="selection.storagepolicy"
                            onSelect={this.handleStoragePolicySelection}
                            value={this.state.storagePolicy}
                        >
                            {storagePolicies.map(element => (
                                <MenuItem eventKey={element} key={`dropdown.storagepolicy.${element}`}>
                                    <FormattedMessage id={element} className="control-label" key={element} />
                                </MenuItem>))}
                        </FormattedDropDown>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <FormattedMessage
                            tagName="label"
                            id="input.description"
                            className="control-label"
                            htmlFor="inputDescription"
                        />
                        <FormattedInput
                            type="text"
                            id="inputDescription"
                            className="form-control"
                            placeholder="input.description"
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </div>
                    <div className={speakerNumRecognitionError ? "form-group has-error col-md-6" : "form-group col-md-6"}>
                        <label className="control-label" htmlFor="selection.speaker">
                            <FormattedMessage id="input.speaker" />&nbsp;
                            {speakerNumRecognitionError && <FormattedMessage id="dropdown.error" />}
                        </label>
                        <br />
                        <FormattedDropDown
                            titleId={speakerDropDownTitleId}
                            id="selection.speaker"
                            onSelect={this.handleSpeakerSelection}
                            value={this.state.speakerNumRecognition}
                        >
                            {speakerNumRecognition.map(element => (
                                <MenuItem eventKey={element} key={`dropdown.speaker.${element}`}>
                                    <FormattedMessage id={element} className="control-label" key={element} />
                                </MenuItem>))}
                        </FormattedDropDown>
                    </div>
                </div>
                <div className="row">
                    <div className={picturePreviewError ? "form-group has-error col-md-3" : "form-group col-md-3"}>
                        <label className="control-label">
                            {!picturePreviewError ?
                                <FormattedMessage id="input.previewPicturePercent" />
                                :
                                <FormattedMessage id="input.picturePreviewError" />
                            }
                            <FormattedInput
                                id="inputPreviewPicturePercent"
                                className="form-control"
                                placeholder="input.previewPicturePercent"
                                onChange={this.handleChange}
                                value={this.state.previewPicturePercent}
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                onKeyUp={(event) => { this.validateRange(event, "previewPicturePercentIsValid", 0, 100); }}
                            />
                        </label>
                    </div>
                    <div className={scoreAudioError ? "form-group has-error col-md-3" : "form-group col-md-3"}>
                        <label className="control-label" htmlFor="inputMinScoreValueAudio" >
                            {!scoreAudioError ?
                                <FormattedMessage id="input.minScoreValueAudio" />
                                :
                                <FormattedMessage id="input.minScoreError" />}
                        </label>
                        <FormattedInput
                            id="inputMinScoreValueAudio"
                            className="form-control"
                            placeholder="input.minScoreValueAudio"
                            onChange={this.handleChange}
                            value={this.state.minScoreValueAudio}
                            type="number"
                            min="-16"
                            max="16"
                            onKeyUp={(event) => { this.validateRange(event, "minScoreValueAudioIsValid", -16, 16); }}
                        />
                    </div>
                    <div className={scoreVideoError ? "form-group has-error col-md-3" : "form-group col-md-3"}>
                        <label className="control-label" htmlFor="inputMinScoreValueVideo" >
                            {!scoreVideoError ?
                                <FormattedMessage id="input.minScoreValueVideo" />
                                :
                                <FormattedMessage id="input.minScoreError" />}
                        </label>
                        <FormattedInput
                            id="inputMinScoreValueVideo"
                            className="form-control"
                            placeholder="input.minScoreValueVideo"
                            onChange={this.handleChange}
                            value={this.state.minScoreValueVideo}
                            type="number"
                            min="-16"
                            max="16"
                            onKeyUp={(event) => { this.validateRange(event, "minScoreValueVideoIsValid", -16, 16); }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-3">
                        <Checkbox id="inputKeepPcm" onChange={() => this.setState({keepPcmRawData: !this.state.keepPcmRawData})} checked={this.state.keepPcmRawData} className="label-margin">
                            <FormattedMessage id="input.keepPcm" />
                        </Checkbox>
                    </div>
                    <div className={priorityError ? "form-group has-error col-md-6" : "form-group col-md-6"}>
                        <label className="control-label" htmlFor="selection.priority">
                            <FormattedMessage id="input.priority" />&nbsp;
                            {priorityError && <FormattedMessage id="dropdown.error" />}
                        </label>
                        <br />
                        <FormattedDropDown
                            titleId={priorityDropDownTitleId}
                            id="selection.priority"
                            onSelect={this.handlePrioritySelection}
                            value={this.state.priority}
                        >
                            {priorities.map(element => (
                                <MenuItem eventKey={element} key={`dropdown.priority.${element}`}>
                                    <FormattedMessage id={`dropdown.priority.${element}`} className="control-label" key={element} />
                                </MenuItem>))}
                        </FormattedDropDown>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-12">
                        <button className="btn btn-primary pull-right" onClick={this.sendData}>
                            <FormattedMessage id="button.setting.create" />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

EngineSettingAddNew.propTypes = {
    sendData: PropTypes.func.isRequired,
};
export default EngineSettingAddNew;
