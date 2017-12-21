import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";
import "../css/notifications.css";
import {resetError} from "./../actions";

class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            failureCounter: 0,
            resetErrorMsgs: true,
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
        (nextProps.errorMessage && nextProps.errorMessage.toString() === "TypeError: Failed to fetch") && this.setServerError();

        (nextProps.usersErrorMsg.message) && this.setError(nextProps.usersErrorMsg);
        (nextProps.unittypeError.message) && this.setError(nextProps.unittypeError);
        (nextProps.unitError.message) && this.setError(nextProps.unitError);

        if (this.state.resetErrorMsgs) {
            this.props.dispatch(resetError());
            this.setState({resetErrorMsgs: false});
        } else {
            this.setState({resetErrorMsgs: true});
        }
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
        const messageId = msgId.message;

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
    unittypeError: PropTypes.object.isRequired,
    unitError: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {auth, error} = state;
    const {failureCounter} = auth;
    const {errorMessage} = error;
    const serverError = error.server;
    const usersErrorMsg = error.user;
    const unittypeError = error.unittypes;
    const unitError = error.unit;

    return {
        failureCounter,
        errorMessage,
        serverError,
        usersErrorMsg,
        unittypeError,
        unitError,
    };
}

export default connect(mapStateToProps)(Notifications);
