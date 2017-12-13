import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import OrganizationUnitTypeListItem from "./OrganizationUnitTypeListItem";
import IconWithTooltip from "./IconWithTooltip";

export default class OrganizationUnitTypeList extends React.Component {
    render() {
        const {
            types, deleteType, dispatch, updateType,
        } = this.props;

        return (
            <div>
                <FormattedMessage tagName="h3" id="unittypes.list.headline" />
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th><FormattedMessage id="unittypes.list.name" /></th>
                                <th><FormattedMessage id="unittypes.list.abbr" /></th>
                                <th><FormattedMessage id="unittypes.list.icon" /></th>
                                <th className="text-center" ><IconWithTooltip iconClassName="glyphicon-user" textID="unittypes.list.accountsEnabled" /></th>
                                <th className="text-center" ><IconWithTooltip iconClassName="glyphicon-upload" textID="unittypes.list.artifactsEnabled" /></th>
                                <th><FormattedMessage id="unittypes.list.childTypes" /></th>

                                <th>{/* placeholder for button */}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {types.map(typeItem => <OrganizationUnitTypeListItem key={`ListItem.${typeItem.name}`} types={types} typeItem={typeItem} deleteType={deleteType} dispatch={dispatch} updateType={updateType} />)}
                        </tbody>
                    </table>
                </div>
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
