import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getRootUnit, getOrgUnit, logoutUser, selectUnit, getUnitType} from "../actions";
import OrganisationUnitTreeElement from './OrganizationUnitTreeElement';

class OrganizationUnitTreeView extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(getRootUnit(true));
    }

    render() {
        const {isFetching, unitTree} = this.props;

        return (
            <div>
                <h2>Baum?!</h2>
                {
                    isFetching ?
                        <div className="loader" />
                        :
                        <ul className="org-tree">
                            <OrganisationUnitTreeElement treeElement={unitTree} />
                        </ul>
                }
                {/*
                <ul className="org-tree">
                    <li>
                        <span className="label label-default">
                            <span className="glyphicon glyphicon-menu-down" />
                            <span>System</span>
                        </span>
                        <ul>
                            <li>
                                <span className="label label-default">
                                    <span className="glyphicon glyphicon-menu-right" />
                                    <span>Node</span>
                                </span>
                            </li>
                            <li>
                                <span className="label label-default">
                                    <span className="glyphicon glyphicon-menu-down" />
                                    <span>Node</span>
                                </span>
                                <ul>
                                    <li>
                                        <span className="label label-default">
                                            <span className="glyphicon glyphicon-menu-right" />
                                            <span>Node</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label label-default">
                                            <span className="glyphicon glyphicon-menu-down" />
                                            <span>Node</span>
                                        </span>
                                        <ul>
                                            <li>
                                                <span className="label label-default">
                                                    <span className="glyphicon glyphicon-menu-right" />
                                                    <span>Node</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="label label-default">
                                                    <span className="glyphicon glyphicon-menu-right" />
                                                    <span>Node</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="label label-default">
                                            <span className="glyphicon glyphicon-menu-down" />
                                            <span>Node</span>
                                        </span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                */}
            </div>
        );
    }
}

OrganizationUnitTreeView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    unitTree: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {unittypes, units} = state;
    const typeList = unittypes.list;
    const typesAreLoaded = unittypes.isLoaded;
    const {unitTree, isFetching, selectedUnit} = units;

    return {
        unittypes, typeList, typesAreLoaded, unitTree, isFetching, selectedUnit,
    };
}

export default connect(mapStateToProps)(OrganizationUnitTreeView);
