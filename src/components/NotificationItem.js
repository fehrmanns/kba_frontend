import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

class NotificationItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type,
            textId: this.props.textId,
            dismissible: true
        };
    }

    render() {
        const alertClass = "alert alert-" + this.state.type + (this.state.dismissible && " alert-dismissible");

        return (
            <div className={alertClass} role="alert">
                { this.state.dismissible && <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> }
                <strong><FormattedMessage id={"alert.strong.message."+this.state.type}/></strong> <FormattedMessage id={this.state.textId}/>
            </div>
        );
    }
}

NotificationItem.propTypes = {
    type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
    textId: PropTypes.string.isRequired
};

export default NotificationItem
