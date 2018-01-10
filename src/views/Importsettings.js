import React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Collapse } from "react-bootstrap";
import EngineSettingAddNew from "../components/EngineSettingAddNew";
import EngineSettingList from "../components/EngineSettingList";
import {createEngineSetting, deleteEngineSetting, updateEngineSetting, getEngineSettings} from "../actions";
import "./../css/importsettings.css";

class Importsettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.props.dispatch(getEngineSettings());

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
        this.setState({open: !this.state.open});
    }

    render() {
        const {rights, settingsAreLoaded} = this.props;
        return (
            <div className="importsettings">
                <h1><FormattedMessage id="view.importsettings.title" /></h1>
                {rights["engine-settings"].post &&
                <div className="row">
                    <div className="col-xs-12">
                        <button
                            className="btn btn-primary pull-right "
                            onClick={() => this.toggleAddSetting()}
                        >
                            {this.state.open ? <FormattedMessage id="button.input.close" />
                                : <FormattedMessage id="button.newsetting.open" />
                            }
                        </button>
                    </div>
                    <div className="col-xs-12">
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
                        {settingsAreLoaded &&
                        <EngineSettingList
                            settings={this.props.settingsList}
                            deleteSetting={this.deleteSetting}
                            updateSetting={this.updateSetting}
                        />
                        }
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
    settingsAreLoaded: PropTypes.bool.isRequired,
    settingsList: PropTypes.array.isRequired,
};
function mapStateToProps(state) {
    const {auth, enginesettings} = state;
    const settingsAreLoaded = enginesettings.isLoaded;
    const settingsList = enginesettings.list;
    const {rights} = auth;
    return {rights, settingsAreLoaded, settingsList};
}

export default connect(mapStateToProps)(Importsettings);
