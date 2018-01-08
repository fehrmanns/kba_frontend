import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Checkbox, MenuItem} from "react-bootstrap";
import FormattedDropDown from "../components/i18n/FormattedDropDown";
import FormattedTextarea from "../components/i18n/FormattedTextarea";
import * as constants from "../utilities/constants";
import * as utilities from "../utilities/utilities";

class EngineSettingsListItem extends React.Component {
    constructor(props) {
        super(props);
        const {settingItem} = this.props;
        this.state = {
            name: settingItem.name,
            description: settingItem.description,
            storagePolicy: settingItem.storagePolicy,
            keepPcmRawData: settingItem.keepPcmRawData,
            speakerNumRecognition: settingItem.speakerNumRecognition,
            notModifiedName: settingItem.name,
            nameModified: false,
            descriptionModified: false,
            storagePolicyModified: false,
            keepPcmRawDataModified: false,
            speakerNumRecognitionModified: false,
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.compareContent = this.compareContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        const targetName = event.target.id.replace("tableInput", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase()).replace(`-${this.props.settingItem.name}`, "");

        this.setState({
            [targetName]: event.target.value,
        });
        this.compareContent(targetName, event.target.value);
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
        const newSetting = {
            name: this.state.name,
            description: this.state.description,
            storagePolicy: this.state.storagePolicy,
            keepPcmRawData: this.state.keepPcmRawData,
            speakerNumRecognition: this.state.speakerNumRecognition,
        };

        this.props.updateSetting(this.state.notModifiedName, newSetting);
    }

    render() {
        const {
            rights, deleteSetting, settingItem,
        } = this.props;
        const mayEdit = rights["engine-settings"].put;
        const mayDelete = rights["engine-settings"].delete;
        const storagepolicyDropDownTitleId = this.state.storagePolicy ? this.state.storagePolicy : "selection.storagepolicy";
        const speakerDropDownTitleId = this.state.speakerNumRecognition ? this.state.speakerNumRecognition : "selection.speaker";
        const modified = this.state.nameModified || this.state.descriptionModified || this.state.storagePolicyModified || this.state.keepPcmRawDataModified || this.state.speakerNumRecognitionModified;

        const {speakerNumRecognition, storagePolicies} = constants;
        return (
            <tr >
                <td>
                    {mayEdit ?
                        <input id={`tableInputName-${settingItem.name}`} onChange={this.handleChange} value={this.state.name} />
                        :
                        <span>{this.state.name}</span>
                    }
                </td>
                <td>
                    {mayEdit ?
                        <FormattedTextarea
                            type="text"
                            id="tableInputDescription"
                            className="form-control"
                            placeholder="input.description"
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
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
                                <FormattedMessage tagName="label" id={element} className="control-label" key={element} />
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
                                <FormattedMessage tagName="label" id={element} className="control-label" key={element} />
                            </MenuItem>))}
                    </FormattedDropDown>
                </td>

                {modified && mayEdit &&
                <td className="text-center">
                    <button className="btn btn-xs btn-warning" onClick={this.handleUpdate}>
                        <FormattedMessage id="button.save" />
                    </button>
                </td>
                }
                {!modified && mayDelete &&
                <td className="text-center">
                    <button className="btn btn-xs btn-danger" onClick={() => deleteSetting(this.state.name)}>
                        <FormattedMessage id="button.setting.delete" />
                    </button>
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
