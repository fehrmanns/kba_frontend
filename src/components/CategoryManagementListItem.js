import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import IconItem from "./IconItem";
import {closeSelectIconModal, openSelectIconModal, getCategories, deleteCategory} from "../actions";

class CategoryManagementListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.item.name,
            iconLocation: this.props.item.iconLocation,
            description: this.props.item.description,
            nameModified: false,
            iconLocationModified: false,
            descriptionModified: false,
        };

        this.openIconModal = this.openIconModal.bind(this);
        this.onSelectIcon = this.onSelectIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    onSelectIcon(icon) {
        this.setState({
            iconLocation: icon,
        });
        this.props.dispatch(closeSelectIconModal());
    }

    handleChange(event) {
        event.preventDefault();
        const targetName = event.target.id.replace("tableInput", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase());
        this.setState({ [targetName]: event.target.value });
        this.compareContent(targetName, event.target.value);
    }

    handleUpdate() {
        this.setState({
            nameModified: false,
            iconLocationModified: false,
            descriptionModified: false,
        });
    }

    compareContent(name, value) {
        const propName = `${name}Modified`;
        const compareItem = (this.props.item[name] === null) ? "" : this.props.item[name];
        (compareItem !== value) ? this.setState({[propName]: true}) : this.setState({[propName]: false});
    }

    openIconModal(event) {
        event.preventDefault();
        this.props.dispatch(openSelectIconModal(this.onSelectIcon));
    }

    deleteCategory() {
        this.props.dispatch(deleteCategory(this.state.name)).then(() => this.props.dispatch(getCategories()));
    }

    render() {
        const {
            name,
            iconLocation,
            description,
            nameModified,
            iconLocationModified,
            descriptionModified,
        } = this.state;
        const modified = nameModified || iconLocationModified || descriptionModified;

        return (
            <tr>
                <td>
                    {iconLocation ?
                        <IconItem icon={iconLocation} size={16} selectedItem={this.openIconModal} />
                        :
                        <button className="btn btn-default" onClick={this.openIconModal}>
                            <FormattedMessage id="button.select.icon" />
                        </button>
                    }
                </td>
                <td>
                    <input id="tableInputName" onChange={this.handleChange} value={name} />
                </td>
                <td>
                    <input id="tableInputDescription" onChange={this.handleChange} value={description} />
                </td>
                {modified ?
                    <td className="text-center">
                        <button className="btn btn-xs btn-warning" onClick={this.handleUpdate}>
                            <FormattedMessage id="button.save" />
                        </button>
                    </td>
                    :
                    <td className="text-center">
                        <button className="btn btn-xs btn-danger" onClick={() => this.deleteCategory()}>
                            <FormattedMessage id="button.category.delete" />
                        </button>
                    </td>
                }
            </tr>
        );
    }
}

CategoryManagementListItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

export default CategoryManagementListItem;
