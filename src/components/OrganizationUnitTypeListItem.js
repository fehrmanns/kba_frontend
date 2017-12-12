import React from "react";
import PropTypes from "prop-types";
import {Checkbox} from "react-bootstrap";
import { FormattedMessage} from "react-intl";
import IconDialog from "./IconDialog";

class OrganizationUnitTypeListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.typeItem.name ? this.props.typeItem.name : "",
            iconLocation: this.props.typeItem.iconLocation ? this.props.typeItem.iconLocation : "",
            abbreviation: this.props.typeItem.abbreviation ? this.props.typeItem.abbreviation : "",
            containsUsers: this.props.typeItem.containsUsers,
            containsArtifacts: this.props.typeItem.containsArtifacts,
            childrenKbaOuTypeNames: this.props.typeItem.childrenKbaOuTypeNames ? this.props.typeItem.childrenKbaOuTypeNames : "",
        };
    }

    render() {
        const type = this.props.typeItem;
        return (
            <tr >
                <td><input id="tableInputName" value={this.state.name} /></td>
                <td><input id="tableInputAbbr" value={this.state.abbreviation} /></td>
                <td>
                    <div className="iconArea">
                        <span className={`icon iconexperience-${this.state.iconLocation}`} aria-hidden="true" />
                        <IconDialog onSelectIcon={this.onSelectIcon} />
                    </div>
                </td>
                <td><Checkbox id="tableInputAccounts" value={this.state.containsUsers} /></td>
                <td><Checkbox id="tableInputProfiles" value={this.state.containsArtifacts} /></td>
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
