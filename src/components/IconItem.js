import React from "react";
import PropTypes from "prop-types";
import {injectIntl, intlShape} from "react-intl";

class IconItem extends React.Component {
    render() {
        const {
            intl,
            titleId,
            icon,
            selectedItem,
        } = this.props;

        const formattedTitle = titleId !== "" ? intl.formatMessage({
            id: titleId,
            defaultMessage: "",
        }) : "";

        return (
            <span id={icon} title={formattedTitle} className={`icon iconexperience-${icon}`} aria-hidden="true" onClick={selectedItem} />
        );
    }
}

IconItem.defaultProps = {
    titleId: "",
};

IconItem.propTypes = {
    // eslint-disable-next-line react/no-typos
    intl: intlShape.isRequired,
    titleId: PropTypes.string,
    icon: PropTypes.string.isRequired,
    selectedItem: PropTypes.func.isRequired,
};

export default injectIntl(IconItem);
