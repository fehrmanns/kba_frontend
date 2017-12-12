import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import IconDialog from "./../IconDialog";
import {closePasswordModal} from "./../../actions";

class PasswordChangeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: props.showSelectIconModal };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.show !== nextProps.showSelectIconModal) {
            this.setState({show: nextProps.showSelectIconModal});
        }
    }

    render() {
        const close = () => {
            this.props.dispatch(closePasswordModal());
        };
        // eslint-disable-next-line react/no-typos
        const {backdrop} = this.props;

        return (
            <div className="modal-container">
                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    backdrop={backdrop}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Body>
                        <IconDialog />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

PasswordChangeModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    showSelectIconModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    console.log("mapStateToProps", state);
    const {modals} = state;
    const {showSelectIconModal, backdrop} = modals;

    return {
        showSelectIconModal,
        backdrop,
    };
}

export default connect(mapStateToProps)(PasswordChangeModal);
