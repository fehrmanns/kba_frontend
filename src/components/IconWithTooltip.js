import React from "react";
import PropTypes from "prop-types";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {FormattedMessage} from "react-intl";

class IconWithTooltip extends React.Component {
    render() {
        const tooltip = <Tooltip id={`tooltip_${this.props.textID}`}> <FormattedMessage id={this.props.textID} /></Tooltip>;

        return (
            <OverlayTrigger
                overlay={tooltip}
                placement="top"
                delayShow={300}
                delayHide={150}
            >
                <span className={`glyphicon ${this.props.iconClassName}`} aria-hidden="true" />
            </OverlayTrigger>
        );
    }
}

IconWithTooltip.propTypes = {
    textID: PropTypes.string.isRequired,
    iconClassName: PropTypes.string.isRequired,
};
export default IconWithTooltip;
