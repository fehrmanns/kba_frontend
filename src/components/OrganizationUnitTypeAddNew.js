import * as React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Checkbox} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";

import FormattedInput from "../components/i18n/FormattedInput";
import ImageDialog from "./IconDialog";

class OrganizationUnitTypeAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            iconLocation: "",
            abbreviation: "",
            containsUsers: false,
            containsArtifacts: false,
            childrenKbaOuTypeNames: "",
            nameIsValid: true,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    log(event){
        console.log(event);
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
            case "containsUsers":
                this.setState({
                    [targetName]: event.target.value,
                });
                break;
            case "containsArtifacts":
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
            childrenKbaOuTypeNames: "",
            nameIsValid: true,
        });
    }


    render() {
        const nameError = !this.state.nameIsValid;
        const {types} = this.props;
        // TODO: Typeahead drop down is closed after selection and cannot be opened with keyboard entry
        return (
            <form className="highlight" onSubmit={this.handleSubmit} >
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h3" id="unittypemanagement.addnew.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className={nameError ? "form-group has-error col-xs-6" : "form-group col-xs-6"}>
                        <label className="control-label" htmlFor="inputUnitTypeName">
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
                    <div className="form-group col-xs-6">
                        <FormattedMessage
                            tagName="label"
                            id="input.abbr"
                            className="control-label"
                            htmlFor="inputAbbr"
                        />
                        <FormattedInput
                            type="text"
                            id="inputAbbreviation"
                            className="form-control"
                            placeholder="input.abbr"
                            onChange={this.handleChange}
                            value={this.state.abbr}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-6">
                        <Checkbox inline >
                            <FormattedMessage
                                tagName="label"
                                id="input.containsAccounts"
                                className="control-label"
                            />
                        </Checkbox>
                        <Checkbox inline>
                            <FormattedMessage
                                tagName="label"
                                id="input.containsArtifacts"
                                className="control-label"
                            />
                        </Checkbox>
                    </div>
                    <div className="form-group col-xs-6">
                        <Typeahead
                            id="childrenKbaOuTypeNames"
                            clearButton
                            labelKey="name"
                            multiple
                            options={this.props.types}
                            placeholder="Choose a type..."
                            onChange={this.log}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-6">
                        <ImageDialog />
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
    types: PropTypes.array.isRequired,
    sendData: PropTypes.func.isRequired,
};
export default OrganizationUnitTypeAddNew;
