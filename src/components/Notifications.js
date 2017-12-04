import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";
import "../css/notifications.css";

class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            messageAmount: 0,
        };
        this.setLoginError = this.setLoginError.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log("check", nextProps.failureCounter);
        (nextProps.failureCounter >= 3) && this.setLoginError();
    }

    setLoginError() {
        let allMessages = this.state.messages;
        allMessages.push(
            {
                id: this.state.messageAmount + 1,
                type: "danger",
                text: "login.label.failureCounter",
                dismissible: false,
            },
            {
                id: this.state.messageAmount + 2,
                type: "warning",
                text: "login.label.warning",
                dismissible: true,
            },
        );

        this.setState({
            messages: allMessages,
        });
        console.log("new state", this.state);
    }


    render() {
        // TODO: this notification has to be closed somehow.
        const {messages} = this.state;
        messages.map(message => console.log("message", message.type));

        return (
            <div className="notifications">
                {messages && messages.map(message => <NotificationItem type={message.type} messageId={message.id} textId={message.text} />)}
                {/*
                <NotificationItem type="danger" textId="alert.message.saved"/>
                <NotificationItem type="info" textId="alert.message.notsaved"/>
                <NotificationItem type="warning" textId="alert.message.401"/>
                <NotificationItem type="success" textId="alert.message.200"/> */}
            </div>
        );
    }
}

Notifications.propTypes = {
    failureCounter: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    const {auth} = state;
    const {failureCounter} = auth;

    return {
        failureCounter,
    };
}

export default connect(mapStateToProps)(Notifications);
