import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getRootUnit} from "../actions";
import OrganisationUnitTreeElement from "./OrganizationUnitTreeElement";

class OrganizationUnitTreeView extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(getRootUnit(true));
    }

    render() {
        const {rootUnit} = this.props;

        return (
            <div>
                <h2>Baum?!</h2>
                <ul className="org-tree">
                    {rootUnit && <OrganisationUnitTreeElement treeElement={rootUnit} />}
                </ul>
            </div>
        );
    }
}

OrganizationUnitTreeView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    rootUnit: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {unittypes, units} = state;
    const typeList = unittypes.list;
    const typesAreLoaded = unittypes.isLoaded;
    const {rootUnit, selectedUnit} = units;

    return {
        unittypes, typeList, typesAreLoaded, rootUnit, selectedUnit,
    };
}

export default connect(mapStateToProps)(OrganizationUnitTreeView);
