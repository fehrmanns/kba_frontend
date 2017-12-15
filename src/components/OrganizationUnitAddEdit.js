import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import FormattedInput from "../components/i18n/FormattedInput";
import FormattedTypeahead from "../components/i18n/FormattedTypeahead";
import IconItem from "./IconItem";
import { getUnitType, logoutUser, updateOrgUnit, createOrgUnit } from "../actions";

class OrganizationUnitAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            parentKbaOuName: "",
            kbaOuTypeName: "",
            nameIsValid: true,
            selectedType: [],
            typeIsValid: true,
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.sendData();
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps);
        this.setState({
            name: nextProps.selectedUnit.name,
            parentKbaOuName: nextProps.selectedUnit.parentKbaOuName,
            selectedType: nextProps.loadedType,
            nameIsValid: true,
            typeIsValid: true,
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
            default:
                this.setState({
                    [targetName]: event.target.value,
                });
        }
    }

    handleTypeChange(item) {
        console.log("item", item);
        this.setState({
            selectedType: item,
        });
    }

    sendData(event) {
        event.preventDefault();

        const nameIsValid = !!this.state.name;
        const typeIsValid = !!(this.state.selectedType && this.state.selectedType.length > 0);
        this.setState({
            nameIsValid,
            typeIsValid,
        });

        if (!nameIsValid || !typeIsValid) return;
        console.log("this.state.kbaOuTypeName", this.state.name);
        const newUnit = {
            name: this.state.name,
            parentKbaOuName: this.state.parentKbaOuName,
            kbaOuTypeName: this.state.selectedType ? this.state.selectedType[0] : "",
        };
        console.log("newUnit", newUnit);
        this.createUnit(newUnit);
        this.setState({
            name: "",
            parentKbaOuName: "",
            selectedType: [],
            nameIsValid: true,
        });
    }

    updateUnit(unitName, unit) {
        this.props.dispatch(updateOrgUnit(unitName, unit))
            .then((response) => {
                if (response.message === "401") {
                    this.props.dispatch(logoutUser());
                }
            });
    }

    getUnitType(typeName) {
        this.props.dispatch(getUnitType(typeName))
            .then((response) => {
                if (response.message === "401") {
                    this.props.dispatch(logoutUser());
                }
            });
    }

    createUnit(newUnit) {
        this.props.dispatch(createOrgUnit(newUnit))
            .then((response) => {
                if (response.message === "401") {
                    this.props.dispatch(logoutUser());
                }
            });
    }

    render() {
        const nameError = !this.state.nameIsValid;
        const typeError = !this.state.typeIsValid;
        const {types} = this.props;
        return (
            <form className="highlight" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h3" id="unitmanagement.addnew.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className={nameError ? "form-group has-error col-md-6" : "form-group col-md-6"}>
                        <label className="control-label" htmlFor="inputName">
                            <FormattedMessage id="input.unitname" />&nbsp;
                            {nameError && <FormattedMessage id="input.notempty" />}
                        </label>
                        <FormattedInput
                            type="text"
                            id="inputName"
                            className="form-control"
                            placeholder="input.unitname"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className={typeError ? "form-group has-error col-md-6" : "form-group col-md-6"}>
                        <label className="control-label" htmlFor="inputName">
                            <FormattedMessage id="input.kbaOuTypeName" />&nbsp;
                            {typeError && <FormattedMessage id="input.notempty" />}
                        </label>
                        {/*    <FormattedMessage
                            tagName="label"
                            id="input.kbaOuTypeName"
                            className="control-label"
                            htmlFor="kbaOuTypeNameSelection"
                        /> */}
                        <FormattedTypeahead
                            id="kbaOuTypeNameSelection"
                            clearButton
                            labelKey="name"
                            placeholder="input.kbaOuTypeNameSelection"
                            options={types}
                            onChange={this.handleTypeChange}
                            selected={this.state.selectedType}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label className="control-label" htmlFor="parentKbaOuName">
                            <FormattedMessage id="input.parentKbaOuName" />
                        </label>
                        <label className="control-label" htmlFor="parentKbaOuName">
                            <span>{this.state.parentKbaOuName}</span>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-12">
                        <button className="btn btn-primary pull-right" onClick={this.sendData}>
                            <FormattedMessage id="button.type.create" />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

OrganizationUnitAddEdit.propTypes = {
    selectedUnit: PropTypes.object.isRequired,
    types: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    loadedType: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {units, unittypes} = state;
    const {selectedUnit} = units;
    const types = unittypes.list;
    const loadedType = unittypes.loadedType;

    return {
        selectedUnit, types, loadedType,
    };
}
export default connect(mapStateToProps)(OrganizationUnitAddEdit);
