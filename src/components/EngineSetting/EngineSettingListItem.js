import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Checkbox, MenuItem} from "react-bootstrap";
import FormattedDropDown from "../i18n/FormattedDropDown";
import InputfieldWithTooltip from "../../utilities/InputfieldWithTooltip";
import FormattedButton from "../i18n/FormattedButton";
import * as constants from "../../utilities/constants";
import * as utilities from "../../utilities/utilities";
import * as validator from "../../utilities/validator";

class EngineSettingsListItem extends React.Component {
    constructor(props) {
        super(props);
        const {settingItem} = this.props;
        this.state = {
            name: settingItem.name ? settingItem.name : "",
            description: settingItem.description ? settingItem.description : "",
            storagePolicy: settingItem.storagePolicy ? settingItem.storagePolicy : null,
            keepPcmRawData: settingItem.keepPcmRawData,
            speakerNumRecognition: settingItem.speakerNumRecognition ? settingItem.speakerNumRecognition : null,
            previewPicturePercent: settingItem.previewPicturePercent || settingItem.previewPicturePercent === 0 ? settingItem.previewPicturePercent : "",
            minScoreValueAudio: settingItem.minScoreValueAudio || settingItem.minScoreValueAudio === 0 ? settingItem.minScoreValueAudio : "",
            minScoreValueVideo: settingItem.minScoreValueVideo || settingItem.minScoreValueVideo === 0 ? settingItem.minScoreValueVideo : "",
            notModifiedName: settingItem.name,
            priority: settingItem.priority || settingItem.priority === 0 ? settingItem.priority : null,
            nameModified: false,
            descriptionModified: false,
            storagePolicyModified: false,
            keepPcmRawDataModified: false,
            speakerNumRecognitionModified: false,
            previewPicturePercentModified: false,
            priorityModified: false,
            minScoreValueAudioModified: false,
            minScoreValueVideoModified: false,
            previewPicturePercentIsValid: true,
            minScoreValueAudioIsValid: true,
            minScoreValueVideoIsValid: true,
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.compareContent = this.compareContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.validateAndHandleChange = this.validateAndHandleChange.bind(this);
    }

    handleChange(event, strToCut) {
        event.preventDefault();

        const targetName = event.target.id.replace("tableInput", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase()).replace(`-${strToCut}`, "");
        this.setState({
            [targetName]: event.target.value,
        });
        this.compareContent(targetName, event.target.value);
    }

    validateRange(event, attribute, min, max) {
        if (!validator.inRangeOrEmpty(event.target.value, min, max)) {
            this.setState({[attribute]: false});
            return false;
        }
        this.setState({[attribute]: true});
        return true;
    }

    validateAndHandleChange(event, strToCut, attribute, min, max) {
        this.validateRange(event, attribute, min, max);
        this.handleChange(event, strToCut);
    }

    handleSelection(name, event) {
        this.setState({[name]: event});
        this.compareContent(name, event);
    }

    compareContent(name, value) {
        const propName = `${name}Modified`;
        this.setState({[propName]: utilities.determineModifiedValue(name, value, this.state[name])});
    }

    handleUpdate() {
        if (!this.state.previewPicturePercentIsValid || !this.state.minScoreValueAudioIsValid || !this.state.minScoreValueVideoIsValid) return;

        const newSetting = {
            name: this.state.name,
            description: this.state.description,
            storagePolicy: this.state.storagePolicy,
            keepPcmRawData: this.state.keepPcmRawData,
            speakerNumRecognition: this.state.speakerNumRecognition,
            previewPicturePercent: this.state.previewPicturePercent,
            minScoreValueAudio: this.state.minScoreValueAudio,
            minScoreValueVideo: this.state.minScoreValueVideo,
            priority: this.state.priority || this.state.priority === 0 ? this.state.priority : null,
        };

        this.props.updateSetting(this.state.notModifiedName, newSetting);

        this.setState({
            nameModified: false,
            descriptionModified: false,
            storagePolicyModified: false,
            keepPcmRawDataModified: false,
            speakerNumRecognitionModified: false,
            previewPicturePercentModified: false,
            minScoreValueAudioModified: false,
            minScoreValueVideoModified: false,
            priorityModified: false,
            previewPicturePercentIsValid: true,
            minScoreValueAudioIsValid: true,
            minScoreValueVideoIsValid: true,
        });
    }

    render() {
        const {
            rights, deleteSetting, settingItem,
        } = this.props;
        const mayEdit = rights["engine-settings"].put;
        const mayDelete = rights["engine-settings"].delete;
        const storagepolicyDropDownTitleId = this.state.storagePolicy ? this.state.storagePolicy : "selection.storagepolicy";
        const speakerDropDownTitleId = this.state.speakerNumRecognition ? this.state.speakerNumRecognition : "selection.speaker";
        const priorityDropDownTitleId = this.state.priority || this.state.priority === 0 ? `dropdown.priority.${this.state.priority}` : "selection.priority";
        const modified = this.state.nameModified || this.state.descriptionModified || this.state.storagePolicyModified || this.state.keepPcmRawDataModified || this.state.speakerNumRecognitionModified || this.state.previewPicturePercentModified || this.state.minScoreValueAudioModified || this.state.minScoreValueVideoModified || this.state.priorityModified;

        const {speakerNumRecognition, storagePolicies, priorities} = constants;
        const tooltipVideo = this.state.minScoreValueVideoIsValid ? "" : "input.minScoreError";
        const tooltipAudio = this.state.minScoreValueAudioIsValid ? "" : "input.minScoreError";
        const tooltipPicture = this.state.previewPicturePercentIsValid ? "" : "input.picturePreviewError";
        const classNameVideo = this.state.minScoreValueVideoIsValid ? "" : "has-error";
        const classNameAudio = this.state.minScoreValueAudioIsValid ? "" : "has-error";
        const classNamePicture = this.state.previewPicturePercentIsValid ? "" : "has-error";
        return (
            <tr >
                <td>
                    {mayEdit ?
                        <input id={`tableInputName-${settingItem.name}`} onChange={event => this.handleChange(event, settingItem.name)} value={this.state.name} className="form-control" />
                        :
                        <span>{this.state.name}</span>
                    }
                </td>
                <td>
                    {mayEdit ?
                        <input id={`tableInputDescription-${settingItem.description}`} onChange={event => this.handleChange(event, settingItem.description)} value={this.state.description} className="form-control" />
                        :
                        <span>{this.state.description}</span>
                    }
                </td>
                <td><Checkbox
                    id="keepPcmRawData"
                    onChange={() => {
                        this.setState({
                            keepPcmRawData: !this.state.keepPcmRawData,
                            keepPcmRawDataModified: !this.state.keepPcmRawData !== this.props.settingItem.keepPcmRawData,
                        });
                    }}
                    checked={this.state.keepPcmRawData}
                    disabled={!mayEdit}
                />
                </td>
                <td>
                    <FormattedDropDown
                        bsStyle="link"
                        titleId={storagepolicyDropDownTitleId}
                        id="selection.storagepolicy"
                        onSelect={event => this.handleSelection("storagePolicy", event)}
                        value={this.state.storagePolicy}
                        disabled={!mayEdit}
                    >
                        {storagePolicies.map(element => (
                            <MenuItem eventKey={element} key={`dropdown.storagepolicy.${element}`}>
                                <FormattedMessage id={element} key={element} />
                            </MenuItem>))}
                    </FormattedDropDown>
                </td>
                <td>
                    <FormattedDropDown
                        bsStyle="link"
                        titleId={speakerDropDownTitleId}
                        id="selection.speaker"
                        onSelect={event => this.handleSelection("speakerNumRecognition", event)}
                        value={this.state.speakerNumRecognition}
                        disabled={!mayEdit}
                    >
                        {speakerNumRecognition.map(element => (
                            <MenuItem eventKey={element} key={`dropdown.speaker.${element}`}>
                                <FormattedMessage id={element} key={element} />
                            </MenuItem>))}
                    </FormattedDropDown>
                </td>
                <td>
                    <FormattedDropDown
                        bsStyle="link"
                        titleId={priorityDropDownTitleId}
                        id="selection.priority"
                        onSelect={event => this.handleSelection("priority", event)}
                        value={this.state.priority}
                        disabled={!mayEdit}
                    >
                        {priorities.map(element => (
                            <MenuItem eventKey={element} key={`dropdown.priority.${element}`}>
                                <FormattedMessage id={`dropdown.priority.${element}`} key={element} />
                            </MenuItem>))}
                    </FormattedDropDown>
                </td>
                <td className={classNamePicture}>
                    {mayEdit ?
                        <InputfieldWithTooltip id={`tableInputPreviewPicturePercent-preview${settingItem.name}`} onChange={event => this.validateAndHandleChange(event, `preview${settingItem.name}`, "previewPicturePercentIsValid", 0, 100)} value={this.state.previewPicturePercent} type="number" min="0" max="100" step="0.01" textID={tooltipPicture} className="form-control" />
                        :
                        <span>{this.state.previewPicturePercent}</span>
                    }
                </td>
                <td className={classNameAudio}>
                    {mayEdit ?
                        <InputfieldWithTooltip id={`tableInputMinScoreValueAudio-audio${settingItem.name}`} onChange={event => this.validateAndHandleChange(event, `audio${settingItem.name}`, "minScoreValueAudioIsValid", -16, 16)} value={this.state.minScoreValueAudio} type="number" min="-16" max="16" textID={tooltipAudio} className="form-control" />
                        :
                        <span>{this.state.minScoreValueAudio}</span>
                    }
                </td>
                <td className={classNameVideo}>
                    {mayEdit ?
                        <InputfieldWithTooltip id={`tableInputMinScoreValueVideo-video${settingItem.name}`} onChange={event => this.validateAndHandleChange(event, `video${settingItem.name}`, "minScoreValueVideoIsValid", -16, 16)} value={this.state.minScoreValueVideo} type="number" min="-16" max="16" textID={tooltipVideo} className="form-control" />
                        :
                        <span>{this.state.minScoreValueVideo}</span>
                    }
                </td>

                {modified && mayEdit &&
                <td className="text-center">
                    <FormattedButton title="button.save" className="btn btn-xs btn-success" onClick={this.handleUpdate}>
                        <span className="glyphicon glyphicon-pencil" />
                    </FormattedButton>
                </td>
                }
                {!modified && mayDelete &&
                <td className="text-center">
                    <FormattedButton title="button.setting.delete" className="btn btn-xs btn-danger" onClick={() => deleteSetting(this.state.name)}>
                        <span className="glyphicon glyphicon-trash" />
                    </FormattedButton>
                </td>
                }
            </tr>
        );
    }
}

EngineSettingsListItem.propTypes = {
    settingItem: PropTypes.object.isRequired,
    deleteSetting: PropTypes.func.isRequired,
    updateSetting: PropTypes.func.isRequired,
    rights: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    const {auth} = state;
    const {rights} = auth;

    return {
        rights,
    };
}
export default connect(mapStateToProps)(EngineSettingsListItem);
