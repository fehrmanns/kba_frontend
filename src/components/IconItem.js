import React from "react";
import PropTypes from "prop-types";

class IconItem extends React.Component {
    render() {
        const {icon, selectedItem} = this.props;

        return (
            <li>
                <span className="btn btn-default">
                    <span id={icon} className={`icon ${icon}`} aria-hidden="true" onClick={selectedItem} />
                </span>
            </li>);
    }
}

IconItem.propTypes = {
    icon: PropTypes.string.isRequired,
    selectedItem: PropTypes.func.isRequired,
};

export default IconItem;
