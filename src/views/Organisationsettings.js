import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import { connect } from "react-redux";
import { Collapse, Nav, NavItem } from "react-bootstrap";
import {
    getUnitTypes, deleteUnitType, addUnitType, updateUnitType, getAllOrgUnits,
} from "../actions";
import { getItem, toggleItem } from "../utilities/storage";
import OrganizationUnitTypeList from "../components/OrganizationUnit/OrganizationUnitTypeList";
import OrganizationUnitTypeAddNew from "../components/OrganizationUnit/OrganizationUnitTypeAddNew";
import OrganizationUnitTreeView from "../components/OrganizationUnit/OrganizationUnitTreeView";
import OrganizationUnitAddEdit from "../components/OrganizationUnit/OrganizationUnitAddEdit";
import "./../css/organisationsettings.css";

class Organisationsettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: getItem("add_type_open"),
            activeKey: 1,
        };
        this.props.dispatch(getUnitTypes());

        this.deleteType = this.deleteType.bind(this);
        this.addNewType = this.addNewType.bind(this);
        this.updateType = this.updateType.bind(this);
        this.toggleAddType = this.toggleAddType.bind(this);
        this.toggleView = this.toggleView.bind(this);
    }

    deleteType(type) {
        this.props.dispatch(deleteUnitType(type))
            .then(() => this.props.dispatch(getUnitTypes()));
    }

    addNewType(type) {
        this.props.dispatch(addUnitType(type))
            .then(() => this.props.dispatch(getUnitTypes()))
            .then(() => this.props.dispatch(getAllOrgUnits()));
    }

    updateType(typeName, newType) {
        this.props.dispatch(updateUnitType(typeName, newType))
            .then(() => this.props.dispatch(getUnitTypes()))
            .then(() => this.props.dispatch(getAllOrgUnits()));
    }

    toggleAddType() {
        toggleItem("add_type_open");
        this.setState({
            open: getItem("add_type_open"),
        });
    }
    toggleView(selectedKey) {
        this.setState({
            activeKey: selectedKey,
        });
    }

    render() {
        const {
            typeList, typesAreLoaded, dispatch, allUnits, rights,
        } = this.props;
        const {activeKey} = this.state;

        return (
            <div className="organisationsettings">
                <nav className="navbar">
                    <Nav bsStyle="pills" activeKey={activeKey} onSelect={this.toggleView}>
                        <NavItem eventKey={1}>
                            <FormattedMessage id="organisationsettings.administration.title" />
                        </NavItem>
                        <NavItem eventKey={2}>
                            <FormattedMessage id="organisationtypes.administration.title" />
                        </NavItem>
                    </Nav>
                </nav>
                {activeKey === 1 ?
                    <div className="row">
                        {rights["org-units"].get &&
                        <div className="col-md-6">
                            <OrganizationUnitTreeView allUnits={allUnits} />
                        </div>
                        }
                        {(rights["org-units"].post || rights["org-units"].put) &&
                        <div className="col-md-6">
                            <OrganizationUnitAddEdit />
                        </div>
                        }
                    </div>
                    :
                    <div>
                        {rights["org-unit-types"].post &&
                        <div className="row">
                            <div className="col-xs-12">
                                <button className="btn btn-primary pull-right" onClick={() => this.toggleAddType()}>
                                    {this.state.open ?
                                        <FormattedMessage id="button.input.close" />
                                        :
                                        <FormattedMessage id="button.newtype.open" />
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
                    </div>
                }
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
