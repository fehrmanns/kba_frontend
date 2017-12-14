import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import { connect } from "react-redux";
import { Tabs, Tab, Collapse } from "react-bootstrap";
import {
    getUnitTypes, deleteUnitType, logoutUser, addUnitType, updateUnitType, getAllOrgUnits,
    getOrgUnit, getRootUnit,
} from "../actions";
import OrganizationUnitTypeList from "../components/OrganizationUnitTypeList";
import OrganizationUnitTypeAddNew from "../components/OrganizationUnitTypeAddNew";
import "./../css/organisationsettings.css";
import { getItem, toggleItem } from "../utilities/storage";
import OrganizationUnitTreeView from "../components/OrganizationUnitTreeView";

class Organisationsettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: getItem("add_type_open"),
        };
        this.props.dispatch(getUnitTypes());
        this.props.dispatch(getAllOrgUnits());
        this.getUnit("System");

        this.state = {
            unitTree: this.props.loadedUnit,
        };


        this.deleteType = this.deleteType.bind(this);
        this.addNewType = this.addNewType.bind(this);
        this.updateType = this.updateType.bind(this);
        this.toggleAddType = this.toggleAddType.bind(this);
        this.getUnit = this.getUnit.bind(this);
    }

    deleteType(type) {
        this.props.dispatch(deleteUnitType(type))
            .then((response) => {
                if (response.message === "401") {
                    this.props.dispatch(logoutUser());
                } else {
                    this.props.dispatch(getUnitTypes());
                }
            });
    }

    addNewType(type) {
        this.props.dispatch(addUnitType(type))
            .then((response) => {
                if (response.message === "401") {
                    this.props.dispatch(logoutUser());
                } else {
                    this.props.dispatch(getUnitTypes());
                }
            });
    }

    updateType(typeName, newType) {
        this.props.dispatch(updateUnitType(typeName, newType))
            .then((response) => {
                if (response.message === "401") {
                    this.props.dispatch(logoutUser());
                } else {
                    this.props.dispatch(getUnitTypes());
                }
            });
    }

    getUnit(unitName) {
        this.props.dispatch(getOrgUnit(unitName)).then((response) => {
            if (response.message === "401") {
                this.props.dispatch(logoutUser());
            }
        });
    }

    toggleAddType() {
        toggleItem("add_type_open");
        this.setState({
            open: getItem("add_type_open"),
        });
    }


    /*    expandUnitTree(unitToExpand) {
        this.getUnit(unitToExpand.name);
        const {loadedUnit} = this.props;
        const tree = this.state.treeView;


        this.setState({
            treeView: tree,
        })

    } */

    render() {
        const {
            typeList, typesAreLoaded, dispatch, allUnits, loadedUnit,
        } = this.props;

        return (
            <div className="organisationsettings starter-template">
                <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                    <Tab eventKey={1} title="Organisationsverwaltung" />
                    <div className="row">
                        <div className="col-xs-8" >
                            <OrganizationUnitTreeView allUnits={allUnits} loadedUnit={loadedUnit} />
                        </div> <div className="col-xs-4" />
                    </div>
                    <Tab eventKey={2} title="Organisationstypen" >
                        <div className="row">
                            <div className="col-xs-12">
                                <button
                                    className="btn btn-primary pull-right "
                                    onClick={() => this.toggleAddType()}
                                >
                                    {this.state.open ?
                                        <FormattedMessage id="button.input.close" />
                                        :
                                        <FormattedMessage id="button.newtype.open" />
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <Collapse in={this.state.open}>
                                    <div>
                                        <OrganizationUnitTypeAddNew dispatch={dispatch} types={typeList} sendData={newType => this.addNewType(newType)} />
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                {typesAreLoaded &&
                                <OrganizationUnitTypeList dispatch={dispatch} types={typeList} deleteType={this.deleteType} updateType={this.updateType} />}
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

Organisationsettings.propTypes = {
    dispatch: PropTypes.func.isRequired,
    typeList: PropTypes.array.isRequired,
    typesAreLoaded: PropTypes.bool.isRequired,
    allUnits: PropTypes.array.isRequired,
    loadedUnit: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {unittypes, units} = state;
    const typeList = unittypes.list;
    const typesAreLoaded = unittypes.isLoaded;
    const allUnits = units.list;
    const {loadedUnit} = units;

    return {
        unittypes, typeList, typesAreLoaded, allUnits, loadedUnit,
    };
}

export default connect(mapStateToProps)(Organisationsettings);
