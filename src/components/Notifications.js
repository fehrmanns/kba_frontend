import React from 'react'
import NotificationItem from './NotificationItem'
import '../css/notifications.css'

class Notifications extends React.Component {


    render() {
        return (
            <div className="notifications">
                <NotificationItem type="success" textId="alert.message.saved"/>
                <NotificationItem type="info" textId="alert.message.notsaved"/>
                <NotificationItem type="warning" textId="alert.message.401"/>
                <NotificationItem type="danger" textId="alert.message.400"/>
            </div>
        );
    }
}

export default Notifications
