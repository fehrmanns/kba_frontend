import React from "react";
import PropTypes from "prop-types";
import {FormattedDate, FormattedMessage} from "react-intl";
import FormattedButton from "./../i18n/FormattedButton";


class JobTableItem extends React.Component {
    constructor(props) {
        super(props);
        this.showInfo = this.showInfo.bind(this);
    }

    showInfo() {

    }

    render() {
        const {item} = this.props;
        const isGroup = !!item.groupName;
        const fileNo = isGroup ? item.groupCount : 1;
        const progress = isGroup ? item.groupProgressPercent : item.progressInPercent;
        const state = isGroup ? item.groupState : item.kbaJobStatus;
        return (
            <tr>
                <td>
                    <span>{item.name}</span>
                </td>
                <td>
                    <span>{fileNo}</span>
                </td>
                <td>
                    <span>{item.kbaEngineSettingsName}</span>
                </td>
                <td className="date">
                    <span>
                        {!!item.created && <FormattedDate value={item.created} day="2-digit" month="short" year="numeric" />}
                    </span>
                </td>
                <td>
                    <span>{`${progress}%`}</span>
                </td>
                <td>
                    <span>{state ? <FormattedMessage id={state} /> : ""}</span>
                </td>
                <td>
                    <span>{item.kbaJobType ? <FormattedMessage id={item.kbaJobType} /> : ""}</span>
                </td>
                <td className="button-td">
                    <FormattedButton title="button.info" className="btn btn-xs btn-default" onClick={this.showInfo}>
                        <span className="glyphicon glyphicon-info-sign" />
                    </FormattedButton>
                </td>
            </tr>
        );
    }
}

JobTableItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default JobTableItem;
