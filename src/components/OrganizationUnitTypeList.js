import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import OrganizationUnitTypeListItem from "./OrganizationUnitTypeListItem";

export default class OrganizationUnitTypeList extends React.Component {
    render() {
        const {
            types, deleteType, dispatch, updateType,
        } = this.props;

        return (
            <div>
                <FormattedMessage tagName="h3" id="unittypes.list.headline" />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="unittypes.list.name" /></th>
                            <th><FormattedMessage id="unittypes.list.abbr" /></th>
                            <th><FormattedMessage id="unittypes.list.icon" /></th>
                            <th><FormattedMessage id="unittypes.list.accountsEnabled" /></th>
                            <th><FormattedMessage id="unittypes.list.artifactsEnabled" /></th>
                            <th><FormattedMessage id="unittypes.list.childTypes" /></th>

                            <th>{/* placeholder for button */}</th>
                            <th>{/* placeholder for button */}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map(typeItem => <OrganizationUnitTypeListItem key={`ListItem.${typeItem.name}`} types={types} typeItem={typeItem} deleteType={deleteType} dispatch={dispatch} updateType={updateType} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

OrganizationUnitTypeList.propTypes = {
    types: PropTypes.array.isRequired,
    deleteType: PropTypes.func.isRequired,
    updateType: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};
