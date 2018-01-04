import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import { connect } from "react-redux";
import { Tabs, Tab, Collapse } from "react-bootstrap";
import {
    getUnitTypes, deleteUnitType, addUnitType, updateUnitType,
} from "../actions";
import OrganizationUnitTypeList from "../components/OrganizationUnitTypeList";
import OrganizationUnitTypeAddNew from "../components/OrganizationUnitTypeAddNew";
import "./../css/organisationsettings.css";
import { getItem, toggleItem } from "../utilities/storage";
import OrganizationUnitTreeView from "../components/OrganizationUnitTreeView";
import OrganizationUnitAddEdit from "../components/OrganizationUnitAddEdit";

class Organisationsettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: getItem("add_type_open"),
        };
        this.props.dispatch(getUnitTypes());
        // this.props.dispatch(getAllOrgUnits());

        this.deleteType = this.deleteType.bind(this);
        this.addNewType = this.addNewType.bind(this);
        this.updateType = this.updateType.bind(this);
        this.toggleAddType = this.toggleAddType.bind(this);
    }

    deleteType(type) {
        this.props.dispatch(deleteUnitType(type))
            .then(() => this.props.dispatch(getUnitTypes()));
    }

    addNewType(type) {
        this.props.dispatch(addUnitType(type))
            .then(() => this.props.dispatch(getUnitTypes()));
    }

    updateType(typeName, newType) {
        this.props.dispatch(updateUnitType(typeName, newType))
            .then(() => this.props.dispatch(getUnitTypes()));
    }

    toggleAddType() {
        toggleItem("add_type_open");
        this.setState({
            open: getItem("add_type_open"),
        });
    }


    render() {
        const {
            typeList, typesAreLoaded, dispatch, allUnits, rights,
        } = this.props;

        // TODO: Tab titles
        return (
            <div className="organisationsettings starter-template">
                <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
                    {rights["org-units"].get &&
                    <Tab eventKey={1} title="Organisationsverwaltung">
                        <div className="row">
                            <div className="col-md-6">
                                <OrganizationUnitTreeView allUnits={allUnits} />
                            </div>
                            {(rights["org-units"].post || rights["org-units"].put) &&
                            <div className="col-md-6">
                                <OrganizationUnitAddEdit />
                            </div>
                            }
                        </div>
                    </Tab>
                    }
                    {rights["org-unit-types"].get &&
                    <Tab eventKey={2} title="Organisationstypen">
                        {rights["org-unit-types"].post &&
                        <div className="row">
                            <div className="col-xs-12">
                                <button
                                    className="btn btn-primary pull-right "
                                    onClick={() => this.toggleAddType()}
                                >
                                    {this.state.open ? <FormattedMessage id="button.input.close" />
                                        : <FormattedMessage id="button.newtype.open" />
                                    }
                                </button>
                            </div>
                            <div className="col-xs-12">
                                <Collapse in={this.state.open}>
                                    <div>
                                        <OrganizationUnitTypeAddNew
                                            dispatch={dispatch}
                                            types={typeList}
                                            sendData={newType => this.addNewType(newType)}
                                        />
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        }
                        <div className="row">
                            <div className="col-xs-12">
                                {typesAreLoaded &&
                                <OrganizationUnitTypeList
                                    dispatch={dispatch}
                                    types={typeList}
                                    deleteType={this.deleteType}
                                    updateType={this.updateType}
                                />}
                            </div>
                        </div>
                    </Tab>
                    }
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
    rights: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {unittypes, units, auth} = state;
    const typeList = unittypes.list;
    const typesAreLoaded = unittypes.isLoaded;
    const allUnits = units.list;
    const {rights} = auth;

    return {
        unittypes, typeList, typesAreLoaded, allUnits, rights,
    };
}

export default connect(mapStateToProps)(Organisationsettings);
