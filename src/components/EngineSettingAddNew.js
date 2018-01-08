import * as React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {Checkbox, MenuItem} from "react-bootstrap";
import FormattedInput from "../components/i18n/FormattedInput";
import FormattedDropDown from "../components/i18n/FormattedDropDown";
import FormattedTextarea from "../components/i18n/FormattedTextarea";
import {updateEngineSetting} from "../actions";

class EngineSettingAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            storagePolicy: "",
            keepPcmRawData: false,
            speakerNumRecognition: "",
            nameIsValid: true,
            storagePolicyIsValid: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleStoragePolicySelection = this.handleStoragePolicySelection.bind(this);
        this.handleSpeakerSelection = this.handleSpeakerSelection.bind(this);
    }

    handleStoragePolicySelection(event) {
        this.setState({storagePolicy: event});
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
        console.log("sendData", event);
        console.log("state", this.state);
        event.preventDefault();

        const nameIsValid = !!this.state.name;

        this.setState({
            nameIsValid,
        });

        if (!nameIsValid) return;

        const newSetting = {
            name: this.state.name,
            description: this.state.description,
            storagePolicy: this.state.storagePolicy,
            keepPcmRawData: this.state.keepPcmRawData,
            speakerNumRecognition: this.state.speakerNumRecognition,
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
            nameIsValid: true,
        });
    }


    render() {
        const nameError = !this.state.nameIsValid;
        const storagePolicies = ["DONT_STORE_MEDIA",
            "STORE_MODERATELY_COMPRESSED_MEDIA",
            "STORE_STRONGLY_COMPRESSED_MEDIA",
            "STORE_VERY_STRONGLY_COMPRESSED_MEDIA",
            "STORE_UNMODIFIED_ORIGINAL"];
        const speakerNumRecognition = ["ALWAYS_ONE_SPEAKER_PER_CHANNEL",
            "ALWAYS_TWO_SPEAKERS_PER_CHANNEL",
            "PRECISE_SPEAKER_COUNT_CHECK",
            "FAST_SPEAKER_COUNT_CHECK",
            "CLUSTERING_SPEAKER_COUNT_CHECK"];

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
                    <div className="form-group col-md-2">
                        <FormattedMessage
                            tagName="label"
                            id="input.storagepolicy"
                            className="control-label"
                            htmlFor="inputStoragepolicy"
                        /><br />
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
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <FormattedMessage
                            tagName="label"
                            id="input.description"
                            className="control-label"
                            htmlFor="inputDescription"
                        />
                        <FormattedTextarea
                            type="text"
                            id="inputDescription"
                            className="form-control"
                            placeholder="input.description"
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <Checkbox id="inputKeepPcm" onChange={() => this.setState({keepPcmRawData: !this.state.keepPcmRawData})} checked={this.state.keepPcmRawData}>
                            <FormattedMessage id="input.keepPcm" />
                        </Checkbox>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-3">
                        <FormattedMessage
                            tagName="label"
                            id="input.speaker"
                            className="control-label"
                            htmlFor="inputSpeaker"
                        /><br />
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
