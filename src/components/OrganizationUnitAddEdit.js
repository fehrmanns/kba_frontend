import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import FormattedInput from "../components/i18n/FormattedInput";
import FormattedTypeahead from "../components/i18n/FormattedTypeahead";
import {updateOrgUnit, createOrgUnit, getAllOrgUnits, selectUnit} from "../actions";

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
        if (this.props.rights["org-units"].put) {
            this.setState({
                nameNotModified: nextProps.selectedUnit.name,
                name: nextProps.selectedUnit.name,
                parentKbaOuName: nextProps.selectedUnit.parentKbaOuName,
                selectedParentUnit: [],
                nameIsValid: true,
                typeIsValid: true,
                parentIsValid: true,
                edit: toEdit,
            });
            if (nextProps.selectedUnit.kbaOuTypeName && this.state.selectedType[0] !== nextProps.selectedUnit.kbaOuTypeName) {
                const selectedTypeArray = [];
                selectedTypeArray[0] = nextProps.selectedUnit.kbaOuTypeName ? nextProps.selectedUnit.kbaOuTypeName : "";

                this.setState({
                    selectedType: selectedTypeArray,
                });
            }
        }
    }

    getAllUnits() {
        this.props.dispatch(getAllOrgUnits());
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

        const newUnit = {
            name: this.state.name,
            parentKbaOuName: this.state.edit ? this.state.parentKbaOuName : this.state.selectedParentUnit[0],
            kbaOuTypeName: this.state.selectedType ? this.state.selectedType[0] : "",
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
        this.reset();
        this.props.dispatch(selectUnit({}));
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
        this.props.dispatch(updateOrgUnit(unitName, unit));
    }

    handleUnitChange(item) {
        this.setState({
            selectedParentUnit: item,
        });
    }

    handleTypeChange(item) {
        this.setState({
            selectedType: item,
        });
    }

    // TODO: on Enter nothing is added here.
    handleSubmit(event) {
        event.preventDefault();
        this.sendData();
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    // TODO: unit in tree has to be added
    // TODO: unit list has to be updated
    createUnit(newUnit) {
        this.props.dispatch(createOrgUnit(newUnit));
    }

    render() {
        const nameError = !this.state.nameIsValid;
        const typeError = !this.state.typeIsValid;
        const parentError = !this.state.parentIsValid;
        const types = this.props.types.map(item => item.name);
        const unitNames = this.props.unitList.map(item => item.name);
        const {name} = this.state;
        const {rights} = this.props;

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
                        <button
                            className="btn btn-default pull-right "
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
                            onChange={this.handleChange}
                            value={name}
                            type="text"
                            id="inputName"
                            className="form-control"
                            placeholder="input.unitname"
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
