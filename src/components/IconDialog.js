import * as React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Modal, Button } from "react-bootstrap";
import IconItem from "./IconItem";
import "../css/icondialog.css";

class IconDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };

        this.open = this.open.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.close = this.close.bind(this);
        this.selectedItem = this.selectedItem.bind(this);
    }

    getInitialState() {
        return { showModal: false };
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    getIcons() {
        const icons = [];
        let cssRules;

        for (let i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href && document.styleSheets[i].href.endsWith("demo.css")) {
                cssRules = document.styleSheets[i].cssRules;
                break;
            }
        }
        for (let i = 0; i < cssRules.length; i++) {
            const selectorText = cssRules[i].selectorText;
            if (selectorText && selectorText.match(/^\.icon-[a-z_-]+(:)*before$/)) {
                icons.push(selectorText.substr(1, selectorText.indexOf(":") - 1));
            }
        }
        return icons;
    }

    selectedItem(event) {
        console.log(event.target.id);
        this.close();
    }

    render() {
        const icons = this.getIcons();

        return (
            <div>
                <button className="btn btn-default" onClick={this.open}><FormattedMessage
                    id="button.select.icon"
                />
                </button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title><FormattedMessage
                            id="modal.heading.icon"
                        /></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="list-unstyled icon-dialog">
                            {icons.map(iconItem => <IconItem key={`select_icon_${iconItem}`} icon={iconItem} selectedItem={this.selectedItem} />)}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}><FormattedMessage
                            id="button.close"
                        /></Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default IconDialog;
