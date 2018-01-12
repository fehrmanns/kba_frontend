import * as React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import FormattedIcon from '../i18n/FormattedIcon';
import IconWithTooltip from "../Icon/IconWithTooltip";
import EngineSettingListItem from "./EngineSettingListItem";

class EngineSettingList extends React.Component {
    render() {
        const {
            deleteSetting, updateSetting, settings,
        } = this.props;

        return (
            <div>
                <FormattedMessage tagName="h3" id="enginesettings.list.headline" />
                <div>
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
                            {settings.map(settingItem => (<EngineSettingListItem
                                key={`ListItem.${settingItem.name}`}
                                settingItem={settingItem}
                                deleteSetting={deleteSetting}
                                updateSetting={updateSetting}
                            />))}
                        </tbody>
                    </table>
                </div>
            </div>);
    }
}
EngineSettingList.propTypes = {
    deleteSetting: PropTypes.func.isRequired,
    updateSetting: PropTypes.func.isRequired,
    settings: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const {enginesettings} = state;

    const settingList = enginesettings.list;

    return {
        settingList,
    };
}

export default connect(mapStateToProps)(EngineSettingList);
