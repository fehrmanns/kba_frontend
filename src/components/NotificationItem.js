import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

class NotificationItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dismissible: true,
        };
    }

    render() {
        const { type, textId } = this.props;
        const alertClass = `alert alert-${type}${this.state.dismissible && " alert-dismissible"}`;
        const alertTextId = `alert.strong.message.${type}`;

        return (
            <div className={alertClass} role="alert">
                {/* TODO: make i18n messages. */}
                { this.state.dismissible && <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> }
                <strong><FormattedMessage id={alertTextId} /></strong> <FormattedMessage id={textId} />
            </div>
        );
    }
}

NotificationItem.propTypes = {
    type: PropTypes.oneOf(["success", "info", "warning", "danger"]).isRequired,
    textId: PropTypes.string.isRequired,
};

export default NotificationItem;
