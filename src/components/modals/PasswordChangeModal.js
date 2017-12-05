import React from "react";
import {Modal, Button} from "react-bootstrap";

class PasswordChangeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: props.modal };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.show !== nextProps.modal) {
            this.setState({show: nextProps.modal});
        }
    }

    render() {
        const close = () => {
            this.props.toggleModal();
            this.setState({ show: false});
        };

        return (
            <div className="modal-container">
                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-group">
                            <label>Recipe</label>
                            <input type="text" className="form-control" />
                            <label>Ingredients</label>
                            <textarea type="text" className="form-control" />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary">Edit Recipe</Button>
                        <Button onClick={close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default PasswordChangeModal;
