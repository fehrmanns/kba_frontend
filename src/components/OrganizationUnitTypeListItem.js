import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {Checkbox} from "react-bootstrap";
import { FormattedMessage} from "react-intl";
import IconItem from "./IconItem";
import { closeSelectIconModal, openSelectIconModal } from "../actions";
import FormattedTypeahead from "./i18n/FormattedTypeahead";

class OrganizationUnitTypeListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.typeItem.name ? this.props.typeItem.name : "",
            iconLocation: this.props.typeItem.iconLocation ? this.props.typeItem.iconLocation : "",
            abbreviation: this.props.typeItem.abbreviation ? this.props.typeItem.abbreviation : "",
            containsUsers: this.props.typeItem.containsUsers,
            containsArtifacts: this.props.typeItem.containsArtifacts,
            childrenKbaOuTypeNames: this.props.typeItem.childrenKbaOuTypeNames ? this.props.typeItem.childrenKbaOuTypeNames : [],
            nameModified: false,
            abbreviationModified: false,
            iconLocationModified: false,
            containsUsersModified: false,
            containsArtifactsModified: false,
            childrenModified: false,
        };
        this.onSelectIcon = this.onSelectIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubTypeChange = this.handleSubTypeChange.bind(this);
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
            childrenModified: false,
        });
    }

    handleSubTypeChange(selectedItems) {
        this.setState({
            childrenKbaOuTypeNames: selectedItems,
            childrenModified: true,
        });
    }

    render() {
        const {
            nameModified,
            abbreviationModified,
            containsArtifactsModified,
            containsUsersModified,
            iconLocationModified,
            childrenModified,
        } = this.state;
        const modified = nameModified || abbreviationModified || containsArtifactsModified || containsUsersModified || iconLocationModified || childrenModified;
        const allTypeNames = this.props.types.map(item => item.name);
        const type = this.props.typeItem;
        const {rights} = this.props;

        return (

            <tr >
                <td>
                    {(rights["org-unit-types"].put) ?
                        <input id="tableInputName" onChange={this.handleChange} value={this.state.name} className="form-control" />
                        :
                        <span>{this.state.name}</span>
                    }
                </td>
                <td>
                    {(rights["org-unit-types"].put) ?
                        <input id="tableInputAbbreviation" onChange={this.handleChange} value={this.state.abbreviation} className="form-control" />
                        :
                        <span>{this.state.abbreviation}</span>
                    }
                </td>
                <td>
                    <div className="icon-area">
                        {this.state.iconLocation &&
                        <IconItem
                            icon={this.state.iconLocation}
                            titleId="button.select.icon"
                            selectedItem={rights["org-unit-types"].put ? () => this.props.dispatch(openSelectIconModal(this.onSelectIcon)) : () => {}}
                        />
                        }
                        {!this.state.iconLocation && rights["org-unit-types"].put &&
                        <button className="btn btn-xs btn-default" onClick={() => this.props.dispatch(openSelectIconModal(this.onSelectIcon))} >
                            <FormattedMessage id="button.select.icon" />
                        </button>
                        }
                    </div>
                </td>
                <td>
                    <Checkbox
                        id="containsUsers"
                        onChange={() => {
                            this.setState({containsUsers: !this.state.containsUsers});
                            this.compareBool("containsUsers", !this.state.containsUsers);
                        }}
                        checked={this.state.containsUsers}
                        disabled={!rights["org-unit-types"].put}
                    />
                </td>
                <td>
                    <Checkbox
                        id="containsArtifacts"
                        onChange={() => {
                            this.setState({containsArtifacts: !this.state.containsArtifacts});
                            this.compareBool("containsArtifacts", !this.state.containsArtifacts);
                        }}
                        checked={this.state.containsArtifacts}
                        disabled={!rights["org-unit-types"].put}
                    />
                </td>
                <td>
                    <FormattedTypeahead
                        id="childrenKbaOuTypeNamesSelection"
                        labelKey="name"
                        multiple
                        placeholder="input.childrenKbaOuTypeNamesSelection"
                        options={allTypeNames}
                        onChange={this.handleSubTypeChange}
                        selected={this.state.childrenKbaOuTypeNames}
                        disabled={!rights["org-unit-types"].put}
                    />
                </td>
                {modified && rights["org-unit-types"].put &&
                <td className="text-center">
                    <button className="btn btn-xs btn-warning" onClick={this.handleUpdate}>
                        <FormattedMessage id="button.save" />
                    </button>
                </td>
                }
                {!modified && rights["org-unit-types"].delete &&
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
    types: PropTypes.array.isRequired,
    rights: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {auth} = state;
    const {rights} = auth;

    return {
        rights,
    };
}

export default connect(mapStateToProps)(OrganizationUnitTypeListItem);
