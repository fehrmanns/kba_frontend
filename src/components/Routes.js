import React from "react";
import {Route, Redirect} from "react-router-dom";
import SecuredRoute from "./SecuredRoutes";
import Home from "./../views/Home";
import Login from "./../views/Login";
import Recordings from "./../views/Recordings";
import BiometricProfiles from "./../views/BiometricProfiles";
import Matchlist from "./../views/Matchlist";
import Matchall from "./../views/Matchall";
import Fileimport from "./../views/Fileimport";
import Joblist from "./../views/Joblist";
import Importsettings from "./../views/Importsettings";
import Usersettings from "../views/UserManagement";
import Organisationsettings from "./../views/Organisationsettings";
import Categorysettings from "./../views/Categorysettings";
import License from "./../views/License";

export default class Routes extends React.Component {
    render() {
        return (
            <SecuredRoute>
                <div>
                    <Route path="/login" render={() => <Login dispatch={this.props.dispatch} auth={this.props.auth} loginUser={this.props.loginUser} />} />
                    <Route exact path="/login" render={() => (<Redirect to="/" />)} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/recordings" component={Recordings} />
                    <Route exact path="/biometricprofiles" component={BiometricProfiles} />
                    <Route exact path="/matchlist" component={Matchlist} />
                    <Route exact path="/topics" component={Matchall} />
                    <Route exact path="/fileimport" component={Fileimport} />
                    <Route exact path="/joblist" component={Joblist} />
                    <Route exact path="/importsettings" component={Importsettings} />
                    <Route exact path="/usersettings" component={Usersettings} />
                    <Route exact path="/organisationsettings" component={Organisationsettings} />
                    <Route exact path="/categorysettings" component={Categorysettings} />
                    <Route exact path="/license" component={License} />
                </div>
            </SecuredRoute>
        );
    }
}
