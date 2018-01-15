import React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Collapse } from "react-bootstrap";
import {toggleItem, getItem} from "./../utilities/storage";
import EngineSettingAddNew from "../components/EngineSetting/EngineSettingAddNew";
import EngineSettingList from "../components/EngineSetting/EngineSettingList";
import {createEngineSetting, deleteEngineSetting, updateEngineSetting, getEngineSettings} from "../actions";
import "./../css/importsettings.css";

class Importsettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: getItem("add_import_settings_open") };

        this.toggleAddSetting = this.toggleAddSetting.bind(this);
        this.createEngineSetting = this.createEngineSetting.bind(this);
        this.deleteSetting = this.deleteSetting.bind(this);
        this.updateSetting = this.updateSetting.bind(this);
    }

    createEngineSetting(newSetting) {
        this.props.dispatch(createEngineSetting(newSetting)).then(() => this.props.dispatch(getEngineSettings()));
    }

    deleteSetting(settingName) {
        this.props.dispatch(deleteEngineSetting(settingName)).then(() => this.props.dispatch(getEngineSettings()));
    }

    updateSetting(settingName, setting) {
        this.props.dispatch(updateEngineSetting(setting, settingName)).then(() => this.props.dispatch(getEngineSettings()));
    }

    toggleAddSetting() {
        toggleItem("add_import_settings_open");
        this.setState({ open: getItem("add_import_settings_open") });
    }

    render() {
        const {rights} = this.props;
        return (
            <div className="importsettings">
                <div className="row">
                    <div className="col-xs-12">
                        <FormattedMessage tagName="h1" id="view.importsettings.title" />
                    </div>
                </div>
                {rights["engine-settings"].post &&
                <div className="row">
                    <div className="col-xs-12">
                        <button
                            className="btn btn-default pull-right "
                            onClick={() => this.toggleAddSetting()}
                        >
                            {this.state.open ? <FormattedMessage id="button.input.close" />
                                : <FormattedMessage id="button.newsetting.open" />
                            }
                        </button>
                    </div>
                    <div className="col-xs-12 col-lg-offset-2 col-lg-8">
                        <Collapse in={this.state.open}>
                            <div>
                                <EngineSettingAddNew sendData={newSetting => this.createEngineSetting(newSetting)} />
                            </div>
                        </Collapse>
                    </div>
                </div>
                }
                {rights["engine-settings"].get &&
                <div className="row">
                    <div className="col-xs-12">
                        <EngineSettingList
                            deleteSetting={this.deleteSetting}
                            updateSetting={this.updateSetting}
                        />
                    </div>
                </div>
                }
            </div>
        );
    }
}

Importsettings.propTypes = {
    dispatch: PropTypes.func.isRequired,
    rights: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {auth, enginesettings} = state;
    const settingsList = enginesettings.list;
    const {rights} = auth;
    return {rights, settingsList};
}

export default connect(mapStateToProps)(Importsettings);
