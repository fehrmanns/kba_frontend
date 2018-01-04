import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import IconItem from "./IconItem";
import {closeSelectIconModal, openSelectIconModal} from "../actions";

class CategoryManagementListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.item.name,
            iconLocation: this.props.item.iconLocation,
            description: this.props.item.description,
        };

        this.openIconModal = this.openIconModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
    }

    onSelectIcon(icon) {
        this.setState({
            iconLocation: icon,
        });
        this.props.dispatch(closeSelectIconModal());
    }

    openIconModal(event) {
        event.preventDefault();
        this.props.dispatch(openSelectIconModal(this.onSelectIcon));
    }


    render() {
        const {name, iconLocation, description} = this.state;

        return (
            <tr>
                <td>
                    {iconLocation ?
                        <IconItem icon={iconLocation} size={32} selectedItem={this.openIconModal} />
                        :
                        <button className="btn btn-default" onClick={this.openIconModal}>
                            <FormattedMessage id="button.select.icon" />
                        </button>
                    }
                </td>
                <td>{name}</td>
                <td>{description}</td>
                <td></td>
            </tr>
        );
    }
}

CategoryManagementListItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

export default CategoryManagementListItem;
