import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import { connect } from "react-redux";
import OrganizationUnitTypeListItem from "./OrganizationUnitTypeListItem";
import IconWithTooltip from "../Icon/IconWithTooltip";
import { getUnitTypes } from "../../actions";

class OrganizationUnitTypeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            types: this.props.types,
        };

        this.props.dispatch(getUnitTypes());
    }

    componentWillReceiveProps(nextProps) {
        (nextProps.types !== this.state.types) && this.setState({types: nextProps.types});
    }

    render() {
        const {
            deleteType, dispatch, updateType,
        } = this.props;

        const {types} = this.state;

        return (
            <div>
                <FormattedMessage tagName="h3" id="unittypes.list.headline" />
                <div>
                    {types ?
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
                        :
                        <div className="loader">Loading...</div>
                    }
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

function mapStateToProps(state) {
    const {unittypes} = state;
    const types = unittypes.list;

    return {
        types,
    };
}

export default connect(mapStateToProps)(OrganizationUnitTypeList);
