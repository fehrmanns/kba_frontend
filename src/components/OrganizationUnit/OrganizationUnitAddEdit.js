import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import FormattedInput from "../i18n/FormattedInput";
import FormattedTypeahead from "../i18n/FormattedTypeahead";
import {updateOrgUnit, createOrgUnit, getAllOrgUnits, selectUnit, getUnitTypes} from "../../actions";

class OrganizationUnitAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameNotModified: "",
            name: "",
            parentKbaOuName: "",
            selectedType: [],
            selectedParentUnit: [],
            nameIsValid: true,
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
        this.createUnit = this.createUnit.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const toEdit = !!nextProps.selectedUnit.name;
        if (this.props.rights["org-units"].put && toEdit) {
            this.setState({
                nameNotModified: nextProps.selectedUnit.name,
                name: nextProps.selectedUnit.name,
                parentKbaOuName: nextProps.selectedUnit.parentKbaOuName,
                selectedParentUnit: [],
                nameIsValid: toEdit,
                typeIsValid: toEdit,
                parentIsValid: toEdit,
                edit: toEdit,
                showError: false,
            });
            if (nextProps.selectedUnit.kbaOuTypeName && this.state.selectedType[0] !== nextProps.selectedUnit.kbaOuTypeName) {
                const selectedTypeArray = [];
                selectedTypeArray[0] = nextProps.selectedUnit.kbaOuTypeName ? nextProps.selectedUnit.kbaOuTypeName : "";

                this.setState({
                    selectedType: selectedTypeArray,
                });
            }
        }
        console.log("nextProps", nextProps);
        if (nextProps.unitList !== this.props.unitList) {
            console.log("unitList", nextProps.unitList);
            console.log("unitList", this.props.unitList);
        }
    }

    getAllUnits() {
        this.props.dispatch(getAllOrgUnits());
    }

    sendData(event) {
        event.preventDefault();
        this.setState({showError: true});
        if (!this.state.nameIsValid || !this.state.typeIsValid || !this.state.parentIsValid) return;

        const newUnit = {
            name: this.state.name,
            parentKbaOuName: this.state.edit ? this.state.parentKbaOuName : this.state.selectedParentUnit[0],
            kbaOuTypeName: this.state.selectedType[0],
        };
        if (this.state.edit) {
            this.updateUnit(this.state.nameNotModified, newUnit);
            this.props.dispatch(selectUnit(newUnit));
        } else {
            this.createUnit(newUnit);
            this.reset();
        }
    }

    clear(event) {
        event.preventDefault();
        this.props.dispatch(selectUnit({}));
        this.reset();
    }

    reset() {
        this.setState({
            showError: false,
            nameNotModified: "",
            name: "",
            parentKbaOuName: "",
            selectedType: [],
            selectedParentUnit: [],
            edit: false,
        });
    }

    updateUnit(unitName, unit) {
        this.props.dispatch(updateOrgUnit(unitName, unit))
            .then(() => this.props.dispatch(getAllOrgUnits()))
            .then(() => this.props.dispatch(getUnitTypes()));
    }

    // TODO: on Enter nothing is added here.
    handleSubmit(event) {
        event.preventDefault();
        this.sendData();
    }

    handleChange(event) {
        this.setState({
            name: event.target.value,
            nameIsValid: !!event.target.value,
        });
    }

    handleTypeChange(item) {
        this.setState({
            selectedType: item,
            typeIsValid: !!item.length,
        });
    }

    handleUnitChange(item) {
        this.setState({
            selectedParentUnit: item,
            parentIsValid: !!item.length,
        });
    }

    createUnit(newUnit) {
        this.props.dispatch(createOrgUnit(newUnit))
            .then(() => this.props.dispatch(getAllOrgUnits()))
            .then(() => this.props.dispatch(getUnitTypes()));
    }

    render() {
        const {name, showError} = this.state;
        const {rights} = this.props;
        const nameError = !this.state.nameIsValid && showError;
        const typeError = !this.state.typeIsValid && showError;
        const parentError = !this.state.parentIsValid && showError;
        const types = this.props.types.map(item => item.name);
        const unitNames = this.props.unitList.map(item => item.name);

        return (
            <form className="highlight" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12">
                        {this.state.edit ?
                            <FormattedMessage tagName="h3" id="unitmanagement.edit.headline" />
                            :
                            <FormattedMessage tagName="h3" id="unitmanagement.addnew.headline" />
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <button className="btn btn-default pull-right" onClick={this.clear}>
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
                            onChange={this.handleChange}
                            value={name}
                            type="text"
                            id="inputName"
                            className="form-control"
                            placeholder="input.unitname"
                        />
                    </div>
                    <div className={typeError ? "form-group has-error col-lg-6" : "form-group col-lg-6"}>
                        <label className="control-label" htmlFor="kbaOuTypeNameSelection">
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
                                <p className="label label-primary">{this.state.parentKbaOuName}</p>
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
                        {(this.state.edit && rights["org-units"].put) &&
                        <button className="btn btn-primary pull-right" onClick={this.sendData}>
                            <FormattedMessage id="button.save" />
                        </button>
                        }
                        {(!this.state.edit && rights["org-units"].post) &&
                            <button className="btn btn-primary pull-right" onClick={this.sendData}>
                                <FormattedMessage id="button.unit.create" />
                            </button>
                        }
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
    rights: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {units, unittypes, auth} = state;
    const {selectedUnit} = units;
    const types = unittypes.list;
    const {typeNames} = units;
    const unitList = units.list;
    const {rights} = auth;

    return {
        selectedUnit, types, typeNames, unitList, rights,
    };
}

export default connect(mapStateToProps)(OrganizationUnitAddEdit);
