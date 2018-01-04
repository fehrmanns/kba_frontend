import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {openSelectIconModal, closeSelectIconModal, addCategory, getCategories} from "./../actions";
import FormattedInput from "../components/i18n/FormattedInput";
import IconItem from "./IconItem";

class CategoryManagementAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            iconLocation: "",
            name: "",
            description: "",
            categoryNameIsValid: true,
        };

        this.onSelectIcon = this.onSelectIcon.bind(this);
        this.openIconModal = this.openIconModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sendData = this.sendData.bind(this);
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
            name: "",
            categoryNameIsValid: true,
        });
    }

    sendData(event) {
        event.preventDefault();

        const categoryNameIsValid = !!this.state.name;

        this.setState({
            categoryNameIsValid,
        });

        if (!categoryNameIsValid) return;

        const newType = {...this.state};
        delete newType.categoryNameIsValid;

        this.props.dispatch(addCategory(JSON.stringify(newType))).then(() => this.props.dispatch(getCategories()));
        this.resetData();
    }

    openIconModal(event) {
        event.preventDefault();
        this.props.dispatch(openSelectIconModal(this.onSelectIcon));
    }

    handleChange(event) {
        event.preventDefault();
        const targetName = event.target.id.replace("category", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase());
        switch (targetName) {
            case "name":
                this.setState({
                    name: event.target.value,
                    categoryNameIsValid: true,
                });
                break;
            case "description":
                this.setState({
                    [targetName]: event.target.value,
                });
                break;
            default:
                this.setState({
                    [targetName]: event.target.value,
                });
        }
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
                    <div className={categoryNameError ? "form-group has-error col-sm-4" : "form-group col-sm-4"}>
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
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group col-sm-8">
                        <label className="control-label" htmlFor="categoryDescription">
                            <FormattedMessage id="input.categorydescription" />
                        </label>
                        <FormattedInput
                            type="text"
                            id="categoryDescription"
                            className="form-control"
                            placeholder="input.categorydescription"
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <FormattedMessage
                            tagName="label"
                            id="label.select.icon"
                            className="control-label"
                        />
                        <div className="icon-area">
                            {this.state.iconLocation ?
                                <IconItem icon={this.state.iconLocation} size={32} titleId="button.select.icon" selectedItem={this.openIconModal} />
                                :
                                <button className="btn btn-default" onClick={this.openIconModal}>
                                    <FormattedMessage id="button.select.icon" />
                                </button>
                            }
                        </div>
                    </div>
                    <div className="form-group col-md-6">
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
