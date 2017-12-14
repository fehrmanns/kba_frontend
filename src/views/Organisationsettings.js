import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import { connect } from "react-redux";
import { Tabs, Tab, Collapse } from "react-bootstrap";
import { getUnitTypes, deleteUnitType, logoutUser, addUnitType, updateUnitType } from "../actions";
import OrganizationUnitTypeList from "../components/OrganizationUnitTypeList";
import OrganizationUnitTypeAddNew from "../components/OrganizationUnitTypeAddNew";
import "./../css/organisationsettings.css";
import { getItem, toggleItem } from '../utilities/storage';

class Organisationsettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: getItem("add_type_open"),
        };
        this.props.dispatch(getUnitTypes());

        this.deleteType = this.deleteType.bind(this);
        this.addNewType = this.addNewType.bind(this);
        this.updateType = this.updateType.bind(this);
        this.toggleAddType = this.toggleAddType.bind(this);
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

    toggleAddType() {
        toggleItem("add_type_open");
        this.setState({
            open: getItem("add_type_open"),
        });
    }

    render() {
        const {typeList, typesAreLoaded, dispatch} = this.props;

        return (
            <div className="organisationsettings starter-template">
                <Tabs defaultActiveKey={2} animation={false} id="noanim-tab-example">
                    <Tab eventKey={1} title="Organisationsverwaltung">
                        <div className="row">
                            <div className="col-xs-12">some content</div>
                        </div>
                    </Tab>
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
};

function mapStateToProps(state) {
    const {unittypes} = state;
    const typeList = unittypes.list;
    const typesAreLoaded = unittypes.isLoaded;

    return {unittypes, typeList, typesAreLoaded};
}

export default connect(mapStateToProps)(Organisationsettings);
