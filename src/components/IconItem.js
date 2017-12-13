import React from "react";
import PropTypes from "prop-types";

class IconItem extends React.Component {
    render() {
        const {icon, selectedItem} = this.props;

        return (
            <span id={icon} className={`icon iconexperience-${icon}`} aria-hidden="true" onClick={selectedItem} />
        );
    }
}

IconItem.propTypes = {
    icon: PropTypes.string.isRequired,
    selectedItem: PropTypes.func.isRequired,
};

export default IconItem;
