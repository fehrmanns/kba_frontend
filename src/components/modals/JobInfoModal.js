import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import JobInfoDialog from "../joblist/JobInfoDialog";
import {closeJobInfoModal} from "./../../actions";

class JobInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: props.showJobInfoModal };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.show !== nextProps.showJobInfoModal) {
            this.setState({show: nextProps.showJobInfoModal});
        }
    }

    render() {
        const close = () => {
            this.props.dispatch(closeJobInfoModal());
        };
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
                        <JobInfoDialog job={this.props.job} />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

JobInfoModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    showJobInfoModal: PropTypes.bool.isRequired,
    backdrop: PropTypes.bool.isRequired,
    job: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {modals} = state;
    const {showJobInfoModal, backdrop, job} = modals;

    return {
        showJobInfoModal,
        backdrop,
        job,
    };
}

export default connect(mapStateToProps)(JobInfoModal);
