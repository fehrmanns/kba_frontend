import * as React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Checkbox } from "react-bootstrap";

import FormattedInput from "../components/i18n/FormattedInput";

class OrganizationUnitTypeAddNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            /*            iconLocation: "",
            abbreviation: "",
            containsUsers: "",
            containsArtifacts: "",
            childrenKbaOuTypeNames: "", */
        };
    }

    render() {
        return (
            <form className="highlight">
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h3" id="unittypemanagement.addnew.headline" />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-6">
                        <label className="control-label" htmlFor="inputUnitTypeName">
                            <FormattedMessage id="input.unittypename" />
                        </label>
                        <FormattedInput
                            type="text"
                            id="inputUnitTypeName"
                            className="form-control"
                            placeholder="input.unittypename"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group col-xs-6">
                        <FormattedMessage
                            tagName="label"
                            id="input.abbr"
                            className="control-label"
                            htmlFor="inputAbbr"
                        />
                        <FormattedInput
                            type="text"
                            id="inputAbbr"
                            className="form-control"
                            placeholder="input.abbr"
                            onChange={this.handleChange}
                            value={this.state.abbr}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-6">
                        <Checkbox inline>
                            <FormattedMessage
                                tagName="label"
                                id="input.containsAccounts"
                                className="control-label"
                            />
                        </Checkbox>
                        <Checkbox inline>
                            <FormattedMessage
                                tagName="label"
                                id="input.containsArtifacts"
                                className="control-label"
                            />
                        </Checkbox>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-xs-12">
                        <button className="btn btn-primary pull-right" onClick={this.sendData}><FormattedMessage
                            id="button.type.create"
                        />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
OrganizationUnitTypeAddNew.propTypes = {
    /* sendData: PropTypes.func.required, */
};
export default OrganizationUnitTypeAddNew;
