import React from "react";
import PropTypes from "prop-types";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {FormattedMessage} from "react-intl";

class InputfieldWithTooltip extends React.Component {
    render() {
        const { textID, ...rest } = this.props;
        const tooltip = <Tooltip id={`tooltip_${textID}`}> <FormattedMessage id={textID} /></Tooltip>;
        return (
            <span>
                {textID ?
                    <OverlayTrigger
                        overlay={tooltip}
                        placement="top"
                        delayShow={300}
                        delayHide={150}
                    >
                        <input {...rest} />
                    </OverlayTrigger>
                    :
                    <input {...rest} />
                }
            </span>
        );
    }
}

InputfieldWithTooltip.propTypes = {
    textID: PropTypes.string.isRequired,
};
export default InputfieldWithTooltip;
