import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import FormattedInput from "../components/i18n/FormattedInput";
import FormattedTypeahead from "../components/i18n/FormattedTypeahead";
import { getUnitType, logoutUser, updateOrgUnit, createOrgUnit, getAllOrgUnits } from "../actions";

class OrganizationUnitAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameNotModified: "",
            name: "",
            parentKbaOuName: "",
            nameIsValid: true,
            selectedType: [],
            selectedParentUnit: [],
            typeIsValid: true,
            parentIsValid: true,
            edit: false,
        };
        this.getAllUnits();
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const toEdit = !!nextProps.selectedUnit.name;
        this.setState({
            nameNotModified: nextProps.selectedUnit.name,
            name: nextProps.selectedUnit.name,
            parentKbaOuName: nextProps.selectedUnit.parentKbaOuName,
            selectedType: nextProps.typeNames,
            selectedParentUnit: [],
            nameIsValid: true,
            typeIsValid: true,
            parentIsValid: true,
            edit: toEdit,
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

    handleSubmit(event) {
        event.preventDefault();
        this.sendData();
    }

    handleTypeChange(item) {
        this.setState({
            selectedType: item,
        });
    }

    handleUnitChange(item) {
        this.setState({
            selectedParentUnit: item,
        });
    }

    sendData(event) {
        event.preventDefault();

        const nameIsValid = !!this.state.name;
        const typeIsValid = !!(this.state.selectedType && this.state.selectedType.length > 0);
        const parentIsValid = !!((this.state.selectedParentUnit && this.state.selectedParentUnit.length > 0) || this.state.parentKbaOuName);
        this.setState({
            nameIsValid,
            typeIsValid,
            parentIsValid,
        });

        if (!nameIsValid || !typeIsValid) return;
        console.log("this.state.kbaOuTypeName", this.state.name);
        const newUnit = {
            name: this.state.name,
            parentKbaOuName: this.state.edit ? this.state.parentKbaOuName : this.state.selectedParentUnit[0],
            kbaOuTypeName: this.state.selectedType ? this.state.selectedType[0] : "",
        };
        console.log("newUnit", newUnit);
        if (this.state.edit) {
            console.log("edit", this.state.nameNotModified);
            this.updateUnit(this.state.nameNotModified, newUnit);
        } else {
            console.log("create");
            this.createUnit(newUnit);
        }
        this.setState({
            name: "",
            parentKbaOuName: "",
            selectedType: [],
            nameIsValid: true,
            edit: false,
        });
        this.reset();
    }

    clear(event) {
        event.preventDefault();
        this.reset();
    }

    reset() {
        this.setState({
            nameNotModified: "",
            name: "",
            parentKbaOuName: "",
            nameIsValid: true,
            selectedType: [],
            selectedParentUnit: [],
            typeIsValid: true,
            parentIsValid: true,
            edit: false,
        });
    }

    updateUnit(unitName, unit) {
        // TODO: unit in tree has to be updated
        // TODO: unit list has to be updated
        this.props.dispatch(updateOrgUnit(unitName, unit))
            .then((response) => {
                (response.message === "200") && console.log("unit has to be updated:", unit);
            });
    }

    getAllUnits() {
        this.props.dispatch(getAllOrgUnits());
    }

    getUnitType(typeName) {
        this.props.dispatch(getUnitType(typeName));
    }

    // TODO: unit in tree has to be added
    // TODO: unit list has to be updated
    createUnit(newUnit) {
        console.log("createOrgUnit", newUnit);
        this.props.dispatch(createOrgUnit(newUnit));
    }

    render() {
        const nameError = !this.state.nameIsValid;
        const typeError = !this.state.typeIsValid;
        const parentError = !this.state.parentIsValid;
        const types = this.props.types.map(item => item.name);
        const unitNames = this.props.unitList.map(item => item.name);

        return (
            <form className="highlight" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12">
                        {this.state.edit ? <FormattedMessage tagName="h3" id="unitmanagement.edit.headline" />
                            : <FormattedMessage tagName="h2" id="unitmanagement.addnew.headline" />
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <button
                            className="btn btn-primary pull-right "
                            onClick={this.clear}
                        >
                            <FormattedMessage id="button.clear" />
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className={nameError ? "form-group has-error col-lg-6" : "form-group col-lg-6"}>
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
                    <div className={typeError ? "form-group has-error col-lg-6" : "form-group col-lg-6"}>
                        <label className="control-label" htmlFor="inputName">
                            <FormattedMessage id="input.kbaOuTypeName" />&nbsp;
                            {typeError && <FormattedMessage id="input.notempty" />}
                        </label>
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
                    {this.state.edit ?
                        <div className="form-group col-lg-6">
                            <label className="control-label" htmlFor="parentKbaOuName">
                                <FormattedMessage id="input.parentKbaOuName" />
                            </label>
                            <div>
                                <label className="control-label" htmlFor="parentKbaOuName">
                                    <span>{this.state.parentKbaOuName}</span>
                                </label>
                            </div>
                        </div>
                        :
                        <div className={parentError ? "form-group has-error col-lg-6" : "form-group col-lg-6"}>
                            <label className="control-label" htmlFor="parentKbaOuName">
                                <FormattedMessage id="input.parentKbaOuName" />&nbsp;
                                {parentError && <FormattedMessage id="input.notempty" />}
                            </label>
                            <FormattedTypeahead
                                id="parentKbaOuNameSelection"
                                clearButton
                                labelKey="name"
                                placeholder="input.parentKbaOuNameSelection"
                                options={unitNames}
                                onChange={this.handleUnitChange}
                                selected={this.state.selectedParentUnit}
                            />
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="form-group col-xs-12">
                        {this.state.edit ?
                            <button className="btn btn-primary pull-right" onClick={this.sendData}>
                                <FormattedMessage id="button.save" />
                            </button>
                            :
                            <button className="btn btn-primary pull-right" onClick={this.sendData}>
                                <FormattedMessage id="button.unit.create" />
                            </button>}
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
    typeNames: PropTypes.array.isRequired,
    unitList: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const {units, unittypes} = state;
    const {selectedUnit} = units;
    const types = unittypes.list;
    const {typeNames} = units;
    const unitList = units.list;

    return {
        selectedUnit, types, typeNames, unitList,
    };
}
export default connect(mapStateToProps)(OrganizationUnitAddEdit);
