import React from "react";
// import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
// import {MenuItem} from "react-bootstrap";
import FormattedInput from "../components/i18n/FormattedInput";

export default class UserManagementAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: "",
            categoryName: "",
            categoryNameIsValid: true,
        };
    }

    getIcons() {
        const icons = [];
        const cssRules = document.styleSheets[0].cssRules; // your bootstrap.css
        for (let i = 0; i < cssRules.length; i++) {
            const selectorText = cssRules[i].selectorText;
            if (selectorText && selectorText.match(/^\.icon-[a-z_-]+$/)) {
                icons.push(selectorText);
            }
        }
        return icons;
    }

    handleChange(event) {
        event.preventDefault();

        const targetName = event.target.id.replace("input", "").replace(/\b[A-Z]/g, letter => letter.toLowerCase());

        switch (targetName) {
            case "categoryName":
                this.setState({
                    [targetName]: event.target.value,
                    categoryNameIsValid: true,
                });
                break;
            default:
                this.setState({
                    [targetName]: event.target.value,
                });
        }
    }

    render() {
        const icons = this.getIcons();
        const categoryNameError = !this.state.categoryNameIsValid;
        console.log(`All Icons: ${icons}`);

        return (
            <form className="highlight" >
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h3" id="categorymanagement.addnew.headline" />
                    </div>
                </div>

                <div className={categoryNameError ? "form-group has-error col-xs-6" : "form-group col-xs-6"}>
                    <label className="control-label" htmlFor="inputCategoryName">
                        <FormattedMessage id="input.categoryname" />&nbsp;
                        {categoryNameError && <FormattedMessage id="input.categoryNameError" />}
                    </label>
                    <FormattedInput
                        type="text"
                        id="inputCategoryName"
                        className="form-control"
                        placeholder="input.categoryname"
                        onChange={this.handleChange}
                        value={this.state.categoryName}
                    />
                </div>
            </form>

        );
    }
}
