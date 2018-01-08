import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getRootUnit, getUnitTypes} from "../actions";
import {FormattedMessage} from "react-intl";
import OrganisationUnitTreeElement from "./OrganizationUnitTreeElement";

class OrganizationUnitTreeView extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(getRootUnit(true));
        this.props.dispatch(getUnitTypes());
    }

    render() {
        const {rootUnit} = this.props;

        return (
            <div className="highlight-margin">
                <FormattedMessage tagName="h3" id="unitmanagement.tree.headline" />
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
