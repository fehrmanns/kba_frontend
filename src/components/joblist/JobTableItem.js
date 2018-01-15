import React from "react";
import PropTypes from "prop-types";
import {FormattedDate, FormattedMessage} from "react-intl";
import FormattedButton from "./../i18n/FormattedButton";


class JobTableItem extends React.Component {
    constructor(props) {
        super(props);
        this.showInfo = this.showInfo.bind(this);
        this.state = {
            groupProgressPercent: 0,
            groupState: "",
        };
    }

    componentWillReceiveProps(nextProps) {

        console.log("cw");
        if (!nextProps.item.groupName) {
            this.determineGroupProgress(nextProps);
        }
    }

    showInfo() {

    }

    render() {
        const {item} = this.props;
        const isGroup = !!item.groupName;
        const fileNo = isGroup ? item.groupCount : 1;
        const progress = isGroup ? this.state.groupProgressPercent : item.progressInPercent;
        const state = isGroup ? this.state.groupState : item.kbaJobStatus;
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
                    <span><FormattedMessage id={state} /></span>
                </td>
                <td>
                    <span><FormattedMessage id={item.kbaJobType} /></span>
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
    item: PropTypes.array.isRequired,
};

export default JobTableItem;
