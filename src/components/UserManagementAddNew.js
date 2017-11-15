import React from 'react'
import {FormattedMessage} from 'react-intl'
import FormattedInput from '../components/i18n/FormattedInput'
import LanguageDropDown from '../components/i18n/LanguageDropDown'
import {MenuItem} from 'react-bootstrap'

export default class UserManagementAddNew extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginName: "",
            firstName: "",
            lastName: "",
            password: "",
            roleName: "default"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleChange(event) {

        const targetName = event.target.id.replace('input', '').toLowerCase();

        switch (targetName) {
            case 'loginname':
                this.setState({
                    loginName: event.target.value
                });
                break;
            case 'firstname':
                this.setState({
                    firstName: event.target.value
                });
                break;
            case 'lastname':
                this.setState({
                    lastName: event.target.value
                });
                break;
            case 'password':
                this.setState({
                    password: event.target.value
                });
                break;
            default:
                return
        }
    }

    handleSelection(value) {

        this.setState({
            roleName: value
        });
    }

    render() {
        const roleDropDownTitleId = "dropdown.role." + this.state.roleName;

        return (
            <div className="starter-template">
                <form>
                    <div className="form-group">
                        <FormattedInput type="text" id="inputLoginName" className="form-control"
                                        placeholder="input.username" onChange={this.handleChange}
                                        value={this.state.loginName}/>
                        <FormattedInput type="text" id="inputFirstName" className="form-control"
                                        placeholder="input.firstname" onChange={this.handleChange}
                                        value={this.state.firstName}/>
                        <FormattedInput type="text" id="inputLastName" className="form-control"
                                        placeholder="input.lastname" onChange={this.handleChange}
                                        value={this.state.lastName}/>
                        <FormattedInput type="text" id="inputPassword" className="form-control"
                                        placeholder="input.password" onChange={this.handleChange}
                                        value={this.state.password}/>
                        <LanguageDropDown id="newUser.roleName.selection"
                                          titleId={roleDropDownTitleId}
                                          onSelect={this.handleSelection}>
                            <MenuItem eventKey="admin"><FormattedMessage id="dropdown.role.admin"/></MenuItem>
                            <MenuItem eventKey="supervisor"><FormattedMessage id="dropdown.role.supervisor"/></MenuItem>
                            <MenuItem eventKey="analyst"><FormattedMessage id="dropdown.role.analyst"/></MenuItem>
                        </LanguageDropDown>
                    </div>
                </form>
            </div>
        );
    }
}
