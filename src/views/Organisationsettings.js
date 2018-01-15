import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import { connect } from "react-redux";
import { Collapse, Nav, NavItem } from "react-bootstrap";
import {
    getUnitTypes, deleteUnitType, addUnitType, updateUnitType, getAllOrgUnits,
} from "../actions";
import { getItem, setItem, toggleItem } from "../utilities/storage";
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
            activeKey: getItem("organisation_activeKey") ? getItem("organisation_activeKey") : 1,
        };

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
        setItem("organisation_activeKey", selectedKey);
        this.setState({
            activeKey: selectedKey,
        });
    }

    render() {
        const {
            typeList, dispatch, allUnits, rights,
        } = this.props;
        const {activeKey} = this.state;

        return (
            <div className="organisationsettings">
                <div className="row">
                    <div className="col-md-6">
                        <FormattedMessage tagName="h1" id="view.organisation.title" />
                    </div>
                    <nav className="navbar col-md-6">
                        <Nav bsStyle="pills navbar-right" activeKey={activeKey} onSelect={this.toggleView}>
                            <NavItem eventKey={1}>
                                <FormattedMessage id="organisationsettings.administration.title" />
                            </NavItem>
                            <NavItem eventKey={2}>
                                <FormattedMessage id="organisationtypes.administration.title" />
                            </NavItem>
                        </Nav>
                    </nav>
                </div>
                {activeKey === 1 ?
                    <div className="row">
                        {(rights["org-units"].post || rights["org-units"].put) &&
                        <div className="col-sm-6 col-sm-push-6">
                            <OrganizationUnitAddEdit />
                        </div>
                        }
                        {rights["org-units"].get &&
                        <div className="col-sm-6 col-sm-pull-6">
                            <OrganizationUnitTreeView allUnits={allUnits} />
                        </div>
                        }
                    </div>
                    :
                    <div>
                        {rights["org-unit-types"].post &&
                        <div className="row">
                            <div className="col-xs-12">
                                <button className="btn btn-default pull-right" onClick={() => this.toggleAddType()}>
                                    {this.state.open ?
                                        <FormattedMessage id="button.input.close" />
                                        :
                                        <FormattedMessage id="button.newtype.open" />
                                    }
                                </button>
                            </div>
                            <div className="col-xs-12 col-lg-offset-2 col-lg-8">
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
                                <OrganizationUnitTypeList
                                    deleteType={this.deleteType}
                                    updateType={this.updateType}
                                />
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
    allUnits: PropTypes.array.isRequired,
    rights: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {unittypes, units, auth} = state;
    const typeList = unittypes.list;
    const allUnits = units.list;
    const {rights} = auth;

    return {
        unittypes, typeList, allUnits, rights,
    };
}

export default connect(mapStateToProps)(Organisationsettings);
