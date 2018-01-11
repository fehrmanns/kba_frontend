import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {Collapse} from "react-bootstrap";
import {toggleItem, getItem} from "./../utilities/storage";
import CategoryManagementAddNew from "../components/CategoryManagement/CategoryManagementAddNew";
import CategoryManagementList from "../components/CategoryManagement/CategoryManagementList";
import "./../css/categorymanagement.css";

class Categorysettings extends React.Component {
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
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h1" id="view.category.title" />
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-xs-12">
                            <button
                                className="btn btn-primary pull-right"
                                onClick={() => this.toggleAddCategory()}
                            >
                                {this.state.open ?
                                    <FormattedMessage id="button.category.closeform" />
                                    :
                                    <FormattedMessage id="button.category.openform" />
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
                    <div className="row">
                        <div className="col-xs-12">
                            <CategoryManagementList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Categorysettings.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {auth} = state;

    return {
        auth,
    };
}

export default connect(mapStateToProps)(Categorysettings);
