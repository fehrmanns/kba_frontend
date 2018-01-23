import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import FormattedIcon from "../i18n/FormattedIcon";
import IconWithTooltip from "../Icon/IconWithTooltip";
import EngineSettingListItem from "./EngineSettingListItem";
import { getEngineSettings } from "../../actions";

class EngineSettingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingList: this.props.settingList,
        };

        this.props.dispatch(getEngineSettings());
    }

    componentWillReceiveProps(nextProps) {
        (nextProps.settingList !== this.state.settingList) && this.setState({settingList: nextProps.settingList});
    }


    render() {
        const {
            deleteSetting, updateSetting,
        } = this.props;
        const {
            settingList,
        } = this.state;

        return (
            <div>
                <FormattedMessage tagName="h3" id="enginesettings.list.headline" />
                <div>
                    { settingList ?
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="enginesettings.list.name" /></th>
                                    <th><FormattedMessage id="enginesettings.list.description" /></th>
                                    <th className="text-center"><IconWithTooltip
                                        iconClassName="glyphicon-floppy-disk"
                                        textID="enginesettings.list.keepPcmRawData"
                                    />
                                    </th>
                                    <th><FormattedMessage id="enginesettings.list.storagePolicy" /></th>
                                    <th><FormattedMessage id="enginesettings.list.speakerNumRecognition" /></th>
                                    <th><FormattedMessage id="enginesettings.list.priority" /></th>
                                    <th className="number-value">
                                    % <FormattedIcon title="enginesettings.list.previewPicturePercent" className="glyphicon glyphicon-picture" />
                                    </th>
                                    <th className="number-value">
                                    min. <FormattedIcon title="enginesettings.list.minScoreValueAudio" className="glyphicon glyphicon-music" />
                                    </th>
                                    <th className="number-value">
                                    min. <FormattedIcon title="enginesettings.list.minScoreValueVideo" className="glyphicon glyphicon-film" />
                                    </th>
                                    <th>{/* placeholder for button */}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {settingList.map(settingItem => (<EngineSettingListItem
                                    key={`ListItem.${settingItem.name}`}
                                    settingItem={settingItem}
                                    deleteSetting={deleteSetting}
                                    updateSetting={updateSetting}
                                />))}
                            </tbody>
                        </table>
                        :
                        <div className="loader">Loading...</div>
                    }
                </div>
            </div>);
    }
}
EngineSettingList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    deleteSetting: PropTypes.func.isRequired,
    updateSetting: PropTypes.func.isRequired,
    settingList: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const {enginesettings} = state;

    const settingList = enginesettings.list;

    return {
        settingList,
    };
}

export default connect(mapStateToProps)(EngineSettingList);
