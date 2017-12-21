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
            failureCounter: 0,
        };
        this.setLoginError = this.setLoginError.bind(this);
        this.removeMessageItem = this.removeMessageItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // count failed logins to set login-failure-alert
        (nextProps.failureCounter >= 3) && this.setLoginError();
        this.setState({failureCounter: nextProps.failureCounter});
        // reset login-failure-alert on successful login
        (nextProps.failureCounter < this.state.failureCounter) && this.removeMessageItem("alert.login.failureCounter");
        // throw alert just by server-errors
        (nextProps.serverError.toString() === "TypeError: Failed to fetch") && this.setServerError();
        (nextProps.errorMessage.toString() === "TypeError: Failed to fetch") && this.setServerError();

        (nextProps.usersErrorMsg.toString() !== "") && this.setError(nextProps.usersErrorMsg);

        //this.props.dispatch(resetError());
    }


    setLoginError() {
        const allMessages = this.state.messages;
        const messageId = "alert.login.failureCounter";

        if (this.state.messages.filter(object => object.id === messageId).length === 0) {
            allMessages.push({
                id: messageId,
                type: "danger",
                text: messageId,
                dismissible: true,
            });

            this.setState({
                messages: allMessages,
            });
        }
    }
    setServerError() {
        const allMessages = this.state.messages;
        const messageId = "alert.message.serverError";

        if (this.state.messages.filter(object => object.id === messageId).length === 0) {
            allMessages.push({
                id: messageId,
                type: "danger",
                text: messageId,
                dismissible: true,
            });

            this.setState({
                messages: allMessages,
            });
        }
    }

    setError(msgId) {
        const allMessages = this.state.messages;
        const messageId = msgId;

        if (this.state.messages.filter(object => object.id === messageId).length === 0) {
            allMessages.push({
                id: messageId,
                type: "danger",
                text: messageId,
                dismissible: true,
            });

            this.setState({
                messages: allMessages,
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
    serverError: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    usersErrorMsg: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {auth, error} = state;
    const {failureCounter} = auth;
    const errorMessage = auth.errorMessage;
    const serverError = error.server;
    const usersErrorMsg = error.user;

    return {
        failureCounter,
        errorMessage,
        serverError,
        usersErrorMsg,
    };
}

export default connect(mapStateToProps)(Notifications);
