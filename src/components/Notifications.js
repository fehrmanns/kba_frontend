import React from 'react'
import {connect} from 'react-redux'
import NotificationItem from './NotificationItem'
import '../css/notifications.css'

class Notifications extends React.Component {

    render() {
        const { messages } = this.props;
        // TODO: this notification has to be closed somehow.

        return (
            <div className="notifications">
                {/* messages && messages.map((message) => <NotificationItem type="success" textId="alert.message.saved"/>) */}
                <NotificationItem type="success" textId="alert.message.saved"/>
                <NotificationItem type="info" textId="alert.message.notsaved"/>
                <NotificationItem type="warning" textId="alert.message.401"/>
                <NotificationItem type="danger" textId="alert.message.400"/>
            </div>
        );
    }
}
function mapStateToProps(state) {

    const {messages} = state;

    return {
        messages
    }
}

export default connect(mapStateToProps)(Notifications)
