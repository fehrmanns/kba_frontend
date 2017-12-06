import React, {Component} from "react";
import PasswordChangeForm from "../components/PasswordChangeForm";

class PasswordReset extends Component {
    render() {
        return (
            <div className="flex-container">
                <div className="form-password-change">
                    <PasswordChangeForm />
                </div>
            </div>
        );
    }
}

export default PasswordReset;
