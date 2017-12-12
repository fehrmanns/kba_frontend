import React from "react";
import PropTypes from "prop-types";
import {Checkbox} from "react-bootstrap";
import { FormattedMessage} from "react-intl";
import IconItem from "./IconItem";
import { closeSelectIconModal, openSelectIconModal } from "../actions";

class OrganizationUnitTypeListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.typeItem.name ? this.props.typeItem.name : "",
            iconLocation: this.props.typeItem.iconLocation ? this.props.typeItem.iconLocation : "",
            abbreviation: this.props.typeItem.abbreviation ? this.props.typeItem.abbreviation : "",
            containsUsers: this.props.typeItem.containsUsers,
            containsArtifacts: this.props.typeItem.containsArtifacts,
            childrenKbaOuTypeNames: [],
            nameModified: false,
            abbreviationModified: false,
            iconLocationModified: false,
            containsUsersModified: false,
            containsArtifactsModified: false,
        };
        this.onSelectIcon = this.onSelectIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    onSelectIcon(icon) {
        this.setState({
            iconLocation: icon,
        });
        this.props.dispatch(closeSelectIconModal());
        this.compareContent("iconLocation", icon);
    }

    handleChange(event) {
        event.preventDefault();

        const targetName = event.target.id.replace("tableInput", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase());

        this.setState({
            [targetName]: event.target.value,
        });
        this.compareContent(targetName, event.target.value);
    }

    compareContent(name, value) {
        const propName = `${name}Modified`;
        const compareItem = (this.props.typeItem[name] === null) ? "" : this.props.typeItem[name];
        (compareItem.toLowerCase() !== value) ? this.setState({[propName]: true}) : this.setState({[propName]: false});
    }

    compareBool(name, value) {
        const propName = `${name}Modified`;
        const compareItem = (this.props.typeItem[name] === null) ? "" : this.props.typeItem[name];
        this.setState({[propName]: (compareItem !== value)});
    }

    handleUpdate() {
        const newType = Object.assign({}, this.props.typeItem, {
            name: this.state.name,
            iconLocation: this.state.iconLocation,
            abbreviation: this.state.abbreviation,
            containsUsers: this.state.containsUsers,
            containsArtifacts: this.state.containsArtifacts,
            childrenKbaOuTypeNames: this.state.childrenKbaOuTypeNames,
        });
        this.props.updateType(this.props.typeItem.name, newType);
        this.setState({
            nameModified: false,
            abbreviationModified: false,
            iconLocationModified: false,
            containsUsersModified: false,
            containsArtifactsModified: false,
        });
    }

    render() {
        const type = this.props.typeItem;
        const modified = this.state.nameModified || this.state.abbreviationModified || this.state.containsArtifactsModified || this.state.containsUsersModified || this.state.iconLocationModified;
        return (
            <tr >
                <td><input id="tableInputName" onChange={this.handleChange} value={this.state.name} /></td>
                <td><input id="tableInputAbbreviation" onChange={this.handleChange} value={this.state.abbreviation} /></td>
                <td>
                    <div className="iconArea">
                        {this.state.iconLocation ?
                            <IconItem icon={this.state.iconLocation} selectedItem={() => this.props.dispatch(openSelectIconModal(this.onSelectIcon))} />
                            :
                            <button className="btn btn-default" onClick={() => this.props.dispatch(openSelectIconModal(this.onSelectIcon))}><FormattedMessage
                                id="button.select.icon"
                            />
                            </button>
                        }
                    </div>
                </td>
                <td><Checkbox
                    id="containsUsers"
                    onChange={() => {
                        this.setState({containsUsers: !this.state.containsUsers});
                        this.compareBool("containsUsers", !this.state.containsUsers);
                    }}
                    checked={this.state.containsUsers}
                />
                </td>
                <td><Checkbox
                    id="containsArtifacts"
                    onChange={() => {
                        this.setState({containsArtifacts: !this.state.containsArtifacts});
                        this.compareBool("containsArtifacts", !this.state.containsArtifacts);
                    }}
                    checked={this.state.containsArtifacts}
                />
                </td>
                <td />
                {modified ?
                    <td className="text-center">
                        <button className="btn btn-xs btn-warning" onClick={this.handleUpdate}>
                            <FormattedMessage id="button.save" />
                        </button>
                    </td> :
                    <td className="text-center">
                        <button className="btn btn-xs btn-danger" onClick={() => this.props.deleteType(type.name)}>
                            <FormattedMessage id="button.type.delete" />
                        </button>
                    </td>
                }
            </tr>
        );
    }
}

OrganizationUnitTypeListItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    typeItem: PropTypes.object.isRequired,
    updateType: PropTypes.func.isRequired,
    deleteType: PropTypes.func.isRequired,
};

export default OrganizationUnitTypeListItem;
