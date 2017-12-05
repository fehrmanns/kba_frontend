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
        this.removeMessageItem = this.removeMessageItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        (nextProps.failureCounter >= 3) && this.setLoginError();
    }

    setLoginError() {
        const allMessages = this.state.messages;
        const messageId = "alert.login.failureCounter";
        if(this.state.messages.filter(object => object.id === messageId).length === 0) {
            allMessages.push({
                id: messageId,
                type: "danger",
                text: messageId,
                dismissible: true,
            });

            this.setState({
                messages: allMessages,
                messageAmount: this.state.messageAmount + 1,
            });
        }
    }

    removeMessageItem(id) {
        this.setState({
            messages: this.state.messages.filter(object => object.id !== id),
        });
    }


    render() {
        // TODO: this notification has to be closed somehow.
        const {messages} = this.state;

        return (
            <div className="notifications">
                {/*
                <NotificationItem type="danger" textId="alert.message.saved"/>
                <NotificationItem type="info" textId="alert.message.notsaved"/>
                <NotificationItem type="warning" textId="alert.message.401"/>
                <NotificationItem type="success" textId="alert.message.200"/>
                */}

                {messages && messages.map(message =>
                    (<NotificationItem
                        type={message.type}
                        key={message.id}
                        id={message.id}
                        textId={message.text}
                        dismissible={message.dismissible}
                        removeMessage={this.removeMessageItem}
                    />))}
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
