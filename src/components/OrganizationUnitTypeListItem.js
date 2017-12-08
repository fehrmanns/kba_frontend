import React from "react";
import PropTypes from "prop-types";
import {Checkbox} from "react-bootstrap";
import { FormattedMessage} from "react-intl";

class OrganizationUnitTypeListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.typeItem.name ? this.props.typeItem.name : "",
            icon: this.props.typeItem.icon ? this.props.typeItem.icon : "",
            abbr: this.props.typeItem.abbr ? this.props.typeItem.abbr : "",
            accountsEnabled: this.props.typeItem.accountsEnabled,
            artifactsEnabled: this.props.typeItem.artifactsEnabled,
        };
    }

    render() {
        const type = this.props.typeItem;
        return (
            <tr >
                <td><input id="tableInputName" value={this.state.name} /></td>
                <td><input id="tableInputIcon" value={this.state.icon} /></td>
                <td><input id="tableInputAbbr" value={this.state.abbr} /></td>
                <td><Checkbox id="tableInputAccounts" value={this.state.accountsEnabled} /></td>
                <td><Checkbox id="tableInputProfiles" value={this.state.artifactsEnabled} /></td>
                <td />
                <td className="text-center">
                    <button className="btn btn-xs btn-danger" onClick={() => this.props.deleteType(type.name)}>
                        <FormattedMessage id="button.type.delete" />
                    </button>
                </td>
            </tr>
        );
    }
}

OrganizationUnitTypeListItem.propTypes = {
    typeItem: PropTypes.object.isRequired,
    /* updateType: PropTypes.func.isRequired, */
    deleteType: PropTypes.func.isRequired,
};

export default OrganizationUnitTypeListItem;
