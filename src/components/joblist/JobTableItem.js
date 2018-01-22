import React from "react";
import PropTypes from "prop-types";
import {FormattedDate, FormattedMessage, FormattedTime} from "react-intl";
import FormattedButton from "./../i18n/FormattedButton";


class JobTableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openGroup: false,
        };
        this.showInfo = this.showInfo.bind(this);
        this.toggleGroup = this.toggleGroup.bind(this);
        this.renderElements = this.renderElements.bind(this);
        this.createRow = this.createRow.bind(this);
        this.toggleGroup = this.toggleGroup.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }

    componentDidMount() {
        const {item} = this.props;
        this.initializeTimer(item, this.state.openGroup);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.item !== this.props.item && this.state.openGroup && !nextProps.item.children) {
            this.setState({
                openGroup: !this.state.openGroup,
            });
            clearInterval(this.timer);
            this.initializeTimer(nextProps.item, !this.state.openGroup);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    initializeTimer(item, openGroupState) {
        const isGroup = !!item.groupName;
        if (isGroup && !openGroupState) {
            this.timer = setInterval(() => this.refreshGroup(), 3000);
        } else if (isGroup && openGroupState) {
            this.timer = setInterval(() => this.refreshGroupJobs(), 3000);
        } else if (!isGroup) {
            this.timer = setInterval(() => this.refreshJob(), 3000);
        }
    }

    refreshGroupJobs() {
        if (this.childRefreshNeeded()) {
            this.refreshChildren();
        }
    }

    refreshJob() {
        const {item} = this.props;
        if (this.refreshNeeded(item.progressInPercent)) {
            this.props.refreshJob(item.name);
        }
    }

    showInfo(event, job) {
        event.preventDefault();
        this.props.showInfo(job);
    }

    childRefreshNeeded() {
        const {children} = this.props.item;
        const filteredChildren = children.filter(child => child.progressInPercent < 100);
        if (filteredChildren.length === 0) {
            clearInterval(this.timer);
            return false;
        }
        return true;
    }

    refreshNeeded(progress) {
        if (progress === 100) {
            clearInterval(this.timer);
            return false;
        }
        return true;
    }

    refreshChildren() {
        const {children} = this.props.item;
        const childrenNo = children.length;
        for (let i = 0; i < childrenNo; i += 1) {
            if (children[i].progressInPercent < 100) {
                this.props.refreshJob(children[i].name);
            }
        }
    }

    refreshGroup() {
        const {item} = this.props;
        if (this.refreshNeeded(item.groupProgressPercent)) {
            this.props.refreshGroup(item.groupName);
        }
    }

    toggleGroup() {
        clearInterval(this.timer);
        const newOpenGroupState = !this.state.openGroup;
        this.setState({
            openGroup: !this.state.openGroup,
        });
        if (newOpenGroupState) {
            this.props.fetchGroupJobs(this.props.item.groupName);
            this.timer = setInterval(() => this.refreshGroupJobs(), 10000);
        } else {
            this.timer = setInterval(() => this.refreshGroup(), 10000);
        }
    }

    createRow(item, isGroup, rowStyle) {
        const fileNo = isGroup ? item.groupCount : 1;
        const progress = isGroup ? item.groupProgressPercent : item.progressInPercent;
        const state = isGroup ? item.groupState : item.kbaJobStatus;
        const toggleClass = this.state.openGroup ? "glyphicon glyphicon-menu-down" : "glyphicon glyphicon-menu-right";
        const row = (
            <tr key={item.name} className={rowStyle}>
                <td>
                    {isGroup &&
                    <button className="btn btn-link" onKeyPress={this.onKeyPress} onClick={this.toggleGroup}>
                        <span className={toggleClass} />
                    </button>
                    }
                </td>
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
                        {!!item.created && <span><FormattedDate value={item.created} day="2-digit" month="2-digit" year="numeric" /> <FormattedTime value={item.created} hour="numeric" minute="numeric" second="numeric" /></span>}
                    </span>
                </td>
                <td>
                    <span>{item.createdBy}</span>
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
                    <FormattedButton title="button.info" className="btn btn-xs btn-default" onClick={event => this.showInfo(event, item)}>
                        <span className="glyphicon glyphicon-info-sign" />
                    </FormattedButton>
                </td>
            </tr>
        );
        return row;
    }

    renderElements() {
        const content = [];
        const {item} = this.props;
        const isGroup = !!item.groupName;
        const groupRow = this.createRow(item, isGroup);
        content.push(groupRow);

        if (isGroup && this.state.openGroup && item.children) {
            const childrenNo = item.children.length;
            for (let i = 0; i < childrenNo; i += 1) {
                const child = item.children[i];
                let rowStyle = "";
                if (i === childrenNo - 1) {
                    rowStyle = "lastRow";
                }
                const newRow = this.createRow(child, false, rowStyle);
                content.push(newRow);
            }
        }
        return content.map(entry => entry);
    }


    render() {
        return (
            this.renderElements()
        );
    }
}

JobTableItem.propTypes = {
    fetchGroupJobs: PropTypes.func.isRequired,
    refreshJob: PropTypes.func.isRequired,
    refreshGroup: PropTypes.func.isRequired,
    showInfo: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

export default JobTableItem;
