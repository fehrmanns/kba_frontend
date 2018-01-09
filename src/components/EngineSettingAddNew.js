import * as React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {Checkbox, MenuItem} from "react-bootstrap";
import FormattedInput from "../components/i18n/FormattedInput";
import FormattedDropDown from "../components/i18n/FormattedDropDown";
import FormattedTextarea from "../components/i18n/FormattedTextarea";
import * as constants from "../utilities/constants";

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
            minScoreValueAudio: 16,
            minScoreValueVideo: 16,
            nameIsValid: true,
            storagePolicyIsValid: true,
            speakerNumRecognitionIsValid: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleStoragePolicySelection = this.handleStoragePolicySelection.bind(this);
        this.handleSpeakerSelection = this.handleSpeakerSelection.bind(this);
    }

    handleStoragePolicySelection(event) {
        this.setState({storagePolicy: event, storagePolicyIsValid: true});
    }

    handleSpeakerSelection(event) {
        this.setState({speakerNumRecognition: event});
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
        const speakerNumRecognitionIsValid = !!this.state.speakerNumRecognitionIsValid;

        this.setState({
            nameIsValid,
            storagePolicyIsValid,
            speakerNumRecognitionIsValid,
        });

        if (!nameIsValid || !storagePolicyIsValid || !speakerNumRecognitionIsValid) return;

        const newSetting = {
            name: this.state.name,
            description: this.state.description,
            storagePolicy: this.state.storagePolicy ? this.state.storagePolicy : null,
            keepPcmRawData: this.state.keepPcmRawData,
            speakerNumRecognition: this.state.speakerNumRecognition ? this.state.speakerNumRecognition : null,
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
            minScoreValueAudio: 16,
            minScoreValueVideo: 16,
            nameIsValid: true,
            storagePolicyIsValid: true,
            speakerNumRecognitionIsValid: true,
        });
    }


    render() {
        const nameError = !this.state.nameIsValid;
        const storagePolicyError = !this.state.storagePolicyIsValid;
        const speakerNumRecognitionError = !this.state.speakerNumRecognitionIsValid;
        const {storagePolicies, speakerNumRecognition} = constants;

        const storagepolicyDropDownTitleId = this.state.storagePolicy ? this.state.storagePolicy : "selection.storagepolicy";
        const speakerDropDownTitleId = this.state.speakerNumRecognition ? this.state.speakerNumRecognition : "selection.speaker";

        // TODO: checkbox state should change when text is clicked
        return (
            <form className="highlight" onSubmit={this.sendData}>
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h3" id="enginesetting.addnew.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className={nameError ? "form-group has-error col-md-4" : "form-group col-md-4"}>
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
                    <div className={storagePolicyError ? "form-group has-error col-md-2" : "form-group col-md-2"}>
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
                                    <FormattedMessage tagName="label" id={element} className="control-label" key={element} />
                                </MenuItem>))}
                        </FormattedDropDown>
                    </div>

                    <div className={speakerNumRecognitionError ? "form-group has-error col-md-3" : "form-group col-md-3"}>
                        <label className="control-label" htmlFor="inputSpeaker">
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
                                    <FormattedMessage tagName="label" id={element} className="control-label" key={element} />
                                </MenuItem>))}
                        </FormattedDropDown>
                    </div>
                    <div className="form-group col-md-2">
                        <Checkbox id="inputKeepPcm" onChange={() => this.setState({keepPcmRawData: !this.state.keepPcmRawData})} checked={this.state.keepPcmRawData} className="label-margin">
                            <FormattedMessage id="input.keepPcm" />
                        </Checkbox>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-4">
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
                    <div className="form-group col-md-2">
                        <FormattedMessage id="input.previewPicturePercent" className="control-label" htmlFor="inputPreviewPicturePercent" tagName="label" />
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
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <FormattedMessage id="input.minScoreValueAudio" className="control-label" htmlFor="inputMinScoreValueAudio" tagName="label" />
                        <FormattedInput
                            id="inputMinScoreValueAudio"
                            className="form-control"
                            placeholder="input.minScoreValueAudio"
                            onChange={this.handleChange}
                            value={this.state.minScoreValueAudio}
                            type="number"
                            min="-16"
                            max="16"
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <FormattedMessage id="input.minScoreValueVideo" className="control-label" htmlFor="inputMinScoreValueVideo" tagName="label" />
                        <FormattedInput
                            id="inputMinScoreValueVideo"
                            className="form-control"
                            placeholder="input.minScoreValueVideo"
                            onChange={this.handleChange}
                            value={this.state.minScoreValueVideo}
                            type="number"
                            min="-16"
                            max="16"
                        />
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
