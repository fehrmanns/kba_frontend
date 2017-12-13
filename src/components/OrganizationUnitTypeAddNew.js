import * as React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {Checkbox} from "react-bootstrap";
import {openSelectIconModal, closeSelectIconModal} from "./../actions";
import FormattedInput from "../components/i18n/FormattedInput";
import FormattedTypeahead from "../components/i18n/FormattedTypeahead";
import IconItem from "./IconItem";

class OrganizationUnitTypeAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            iconLocation: "",
            abbreviation: "",
            containsUsers: false,
            containsArtifacts: false,
            childrenKbaOuTypeNames: [],
            nameIsValid: true,
            childrenKbaOuTypesSelected: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleSubTypeChange = this.handleSubTypeChange.bind(this);
        this.onSelectIcon = this.onSelectIcon.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleSubTypeChange(event) {
        const names = event.map(item => item.name);
        this.setState({
            childrenKbaOuTypeNames: names,
            childrenKbaOuTypesSelected: event,
        });
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
            case "abbreviation":
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

        this.setState({
            nameIsValid,
        });

        if (!nameIsValid) return;

        const newType = {...this.state};
        delete newType.nameIsValid;
        delete newType.childrenKbaOuTypesSelected;

        this.props.sendData(JSON.stringify(newType));
        this.resetData();
    }

    resetData() {
        this.setState({
            name: "",
            iconLocation: "",
            abbreviation: "",
            containsUsers: false,
            containsArtifacts: false,
            childrenKbaOuTypeNames: [],
            nameIsValid: true,
            childrenKbaOuTypesSelected: [],
        });
    }

    onSelectIcon(icon) {
        this.setState({
            iconLocation: icon,
        });
        this.props.dispatch(closeSelectIconModal());
    }


    render() {
        const nameError = !this.state.nameIsValid;
        const {types} = this.props;
        // TODO: Typeahead drop down is closed after selection and cannot be opened with keyboard entry
        // TODO: checkbox state should change when text is clicked
        return (
            <form className="highlight" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h3" id="unittypemanagement.addnew.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className={nameError ? "form-group has-error col-xs-6" : "form-group col-xs-6"}>
                        <label className="control-label" htmlFor="inputName">
                            <FormattedMessage id="input.unittypename" />&nbsp;
                            {nameError && <FormattedMessage id="input.typeNameError" />}
                        </label>
                        <FormattedInput
                            type="text"
                            id="inputName"
                            className="form-control"
                            placeholder="input.unittypename"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group col-xs-4">
                        <FormattedMessage
                            tagName="label"
                            id="input.abbr"
                            className="control-label"
                            htmlFor="inputAbbreviation"
                        />
                        <FormattedInput
                            type="text"
                            id="inputAbbreviation"
                            className="form-control"
                            placeholder="input.abbr"
                            onChange={this.handleChange}
                            value={this.state.abbreviation}
                        />
                    </div>
                    <div className="form-group col-xs-2">
                        <FormattedMessage
                            tagName="label"
                            id="label.select.icon"
                            className="control-label"
                        />
                        <div className="iconArea">
                            {this.state.iconLocation ?
                                <IconItem icon={this.state.iconLocation} selectedItem={() => this.props.dispatch(openSelectIconModal(this.onSelectIcon))} />
                                :
                                <button className="btn btn-default" onClick={() => this.props.dispatch(openSelectIconModal(this.onSelectIcon))}><FormattedMessage
                                    id="button.select.icon"
                                />
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-6">
                        <Checkbox id="inputContainsUsers" onChange={() => this.setState({containsUsers: !this.state.containsUsers})} checked={this.state.containsUsers}>
                            <FormattedMessage
                                tagName="label"
                                id="input.containsAccounts"
                                className="control-label"
                                htmlFor="inputContainsUsers"
                            />
                        </Checkbox>
                        <Checkbox id="inputContainsArtifacts" onChange={() => this.setState({containsArtifacts: !this.state.containsArtifacts})} checked={this.state.containsArtifacts}>
                            <FormattedMessage
                                tagName="label"
                                id="input.containsArtifacts"
                                className="control-label"
                                htmlFor="inputContainsArtifacts"
                            />
                        </Checkbox>
                    </div>
                    <div className="form-group col-xs-6">
                        <FormattedMessage
                            tagName="label"
                            id="input.childrenKbaOuTypes"
                            className="control-label"
                            htmlFor="childrenKbaOuTypeNamesSelection"
                        />
                        <FormattedTypeahead
                            id="childrenKbaOuTypeNamesSelection"
                            clearButton
                            labelKey="name"
                            multiple
                            placeholder="input.childrenKbaOuTypeNamesSelection"
                            options={types}
                            onChange={this.handleSubTypeChange}
                            selected={this.state.childrenKbaOuTypesSelected}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-12">
                        <button className="btn btn-primary pull-right" onClick={this.sendData}><FormattedMessage
                            id="button.type.create"
                        />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

OrganizationUnitTypeAddNew.propTypes = {
    dispatch: PropTypes.func.isRequired,
    types: PropTypes.array.isRequired,
    sendData: PropTypes.func.isRequired,
};
export default OrganizationUnitTypeAddNew;
