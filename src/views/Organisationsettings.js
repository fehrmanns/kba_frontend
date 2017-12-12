import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Tab, Tabs, Collapse } from "react-bootstrap";
import { getUnitTypes, deleteUnitType, logoutUser, addUnitType } from "../actions";
import OrganizationUnitTypeList from "../components/OrganizationUnitTypeList";
import OrganizationUnitTypeAddNew from "../components/OrganizationUnitTypeAddNew";
import "./../css/organisationsettings.css";

class Organisationsettings extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(getUnitTypes());
        this.deleteType = this.deleteType.bind(this);
        this.addNewType = this.addNewType.bind(this);
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

    render() {
        const {typeList, typesAreLoaded} = this.props;
        return (
            <div className="organisationsettings starter-template">
                <Tabs defaultActiveKey={2} animation={false} id="noanim-tab-example">
                    <Tab eventKey={1} title="Organisationsverwaltung"><FormattedMessage
                        id="oranisationsettings.administration.title"
                        tagName="h1"
                    />
                    </Tab>
                    <Tab eventKey={2} title="Organistationstypen">
                        <FormattedMessage id="oranisationtypes.administration.title" tagName="h1" />
                        <div className="row">
                            <div className="col-xs-12">
                                <div>
                                    <OrganizationUnitTypeAddNew types={typeList} sendData={newType => this.addNewType(newType)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                {typesAreLoaded &&
                                <OrganizationUnitTypeList types={typeList} deleteType={this.deleteType} />}
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
