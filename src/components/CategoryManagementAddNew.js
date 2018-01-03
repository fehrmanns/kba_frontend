import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {openSelectIconModal, closeSelectIconModal} from "./../actions";
import FormattedInput from "../components/i18n/FormattedInput";
import IconItem from "./IconItem";

class CategoryManagementAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            iconLocation: "",
            categoryName: "",
            categoryNameIsValid: true,
        };

        // TODO: bring data to life.
        // this.props.dispatch();
        this.onSelectIcon = this.onSelectIcon.bind(this);
        this.openIconModal = this.openIconModal.bind(this);
    }

    onSelectIcon(icon) {
        this.setState({
            iconLocation: icon,
        });
        this.props.dispatch(closeSelectIconModal());
    }

    resetData() {
        this.setState({
            iconLocation: "",
            categoryName: "",
            categoryNameIsValid: true,
        });
    }

    sendData(event) {
        event.preventDefault();

        // const nameIsValid = !!this.state.name;
        //
        // this.setState({
        //     nameIsValid,
        // });
        //
        // if (!nameIsValid) return;

        // const newType = {...this.state};
        // delete newType.nameIsValid;
        // delete newType.childrenKbaOuTypesSelected;

        // this.props.sendData(JSON.stringify(newType));
        this.resetData();
    }

    openIconModal(event) {
        event.preventDefault();
        this.props.dispatch(openSelectIconModal(this.onSelectIcon));
    }

    handleChange(event) {
        event.preventDefault();

        this.setState({
            categoryName: event.target.value,
            categoryNameIsValid: true,
        });
    }

    render() {
        const categoryNameError = !this.state.categoryNameIsValid;

        return (
            <form className="highlight">
                <div className="row">
                    <div className="col-sm-12">
                        <FormattedMessage tagName="h3" id="categorymanagement.addnew.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className={categoryNameError ? "form-group has-error col-sm-6" : "form-group col-sm-6"}>
                        <label className="control-label" htmlFor="categoryName">
                            <FormattedMessage id="input.categoryname" />&nbsp;
                            {categoryNameError && <FormattedMessage id="input.categoryNameError" />}
                        </label>
                        <FormattedInput
                            type="text"
                            id="categoryName"
                            className="form-control"
                            placeholder="input.categoryname"
                            onChange={this.handleChange}
                            value={this.state.categoryName}
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <FormattedMessage
                            tagName="label"
                            id="label.select.icon"
                            className="control-label"
                        />
                        <div className="icon-area">
                            {this.state.iconLocation ?
                                <IconItem icon={this.state.iconLocation} size={32} titleId="button.select.icon" selectedItem={this.openIconModal} />
                                :
                                <button className="btn btn-default" onClick={this.openIconModal}><FormattedMessage
                                    id="button.select.icon"
                                />
                                </button>
                            }
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <button className="btn btn-primary pull-right label-margin" onClick={this.sendData}>
                            <FormattedMessage id="button.category.create" />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

CategoryManagementAddNew.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const {units, unittypes} = state;
    const types = unittypes.list;
    const unitList = units.list;

    return {
        types, unitList,
    };
}
export default connect(mapStateToProps)(CategoryManagementAddNew);
