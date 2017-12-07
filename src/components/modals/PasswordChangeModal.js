import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {closePasswordModal} from "./../../actions";
import PasswordChangeForm from "./../PasswordChangeForm";

class PasswordChangeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: props.showPasswordModal };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.show !== nextProps.showPasswordModal) {
            this.setState({show: nextProps.showPasswordModal});
        }
    }

    render() {
        const close = () => {
            this.props.dispatch(closePasswordModal());
        };

        return (
            <div className="modal-container password-change">
                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Body>
                        <PasswordChangeForm />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

PasswordChangeModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    showPasswordModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {modals} = state;
    const {showPasswordModal} = modals;

    return {
        showPasswordModal,
    };
}

export default connect(mapStateToProps)(PasswordChangeModal);
