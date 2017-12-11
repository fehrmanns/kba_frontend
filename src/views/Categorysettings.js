import React from "react";
import {FormattedMessage} from "react-intl";
import {Collapse} from "react-bootstrap";
import {toggleItem, getItem} from "./../utilities/storage";
import CategoryManagementAddNew from "../components/CategoryManagementAddNew";

export default class Categorysettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: getItem("add_category_open"),
        };
    }

    toggleAddCategory() {
        toggleItem("add_category_open");
        this.setState({
            open: getItem("add_category_open"),
        });
    }

    render() {
        return (
            <div className="categorymanagement">
                <div id="categorytitle" className="row">
                    <div id="categorytitlerow" className="col-xs-12">
                        <FormattedMessage tagName="h1" id="view.category.title" />
                    </div>
                </div>
                <div id="addcategorybuttonrow" className="row">
                    <div id="addcategorybutton column" className="col-xs-12">
                        <button
                            id="addcategorybutton"
                            className="btn btn-primary pull-right"
                            onClick={() => this.toggleAddCategory()}
                        >
                            {this.state.open ?
                                <FormattedMessage id="button.newcategory.closeform" />
                                :
                                <FormattedMessage id="button.newcategory.openform" />
                            }
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Collapse in={this.state.open}>
                            <div>
                                <CategoryManagementAddNew sendData={newUser => this.addNewUser(newUser)} />
                            </div>
                        </Collapse>
                    </div>
                </div>

            </div>
        );
    }
}
