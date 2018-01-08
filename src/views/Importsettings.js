import React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Collapse } from "react-bootstrap";
import EngineSettingAddNew from "../components/EngineSettingAddNew";
import {createEngineSetting} from "../actions";

class Importsettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.toggleAddSetting = this.toggleAddSetting.bind(this);
        this.createEngineSetting = this.createEngineSetting.bind(this);
    }

    createEngineSetting(newSetting) {
        this.props.dispatch(createEngineSetting(newSetting)).then();
    }

    toggleAddSetting() {
        this.setState({open: !this.state.open});
    }

    render() {
        const {rights, settingsAreLoaded} = this.props;
        return (
            <div className="starter-template">
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
                                <EngineSettingAddNew sendData={newType => this.createEngineSetting(newType)} />
                            </div>
                        </Collapse>
                    </div>
                </div>
                }
                {/* <div className="row"> */}
                {/* <div className="col-xs-12"> */}
                {/* {settingsAreLoaded && */}
                {/* <EngineSettingList */}
                {/* deleteType={this.deleteType} */}
                {/* updateType={this.updateType} */}
                {/* />} */}
                {/* </div> */}
                {/* </div> */}
            </div>
        );
    }
}

Importsettings.propTypes = {
    dispatch: PropTypes.func.isRequired,
    rights: PropTypes.object.isRequired,
    settingsAreLoaded: PropTypes.bool.isRequired,
};
function mapStateToProps(state) {
    const {auth, enginesettings} = state;
    const settingsAreLoaded = enginesettings.isLoaded;
    const {rights} = auth;
    return {rights, settingsAreLoaded};
}

export default connect(mapStateToProps)(Importsettings);
