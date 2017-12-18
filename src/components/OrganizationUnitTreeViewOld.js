import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import Tree, {TreeNode} from "rc-tree";
import {connect} from "react-redux";
import {getRootUnit, getOrgUnit, logoutUser, selectUnit, getUnitType} from "../actions";

class OrganizationUnitTreeView extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(getRootUnit(true));

        this.getUnit = this.getUnit.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onLoadData = this.onLoadData.bind(this);
    }

    getUnit(unitName) {
        this.props.dispatch(getOrgUnit(unitName)).then((response) => {
            if (response.message === "401") {
                this.props.dispatch(logoutUser());
            }
        });
    }

    onSelect(keys, selectedNode) {
        this.getUnit(selectedNode.node.props.title);

        selectUnit(this.props.selectedUnit);
        console.log(this.props.selectedUnit);
        getUnitType(this.props.selectedUnit.kbaOuTypeName);
    }

    onLoadData(treeNode) {
        console.log("onLoadData", treeNode.props.children);
    }

    getNewTreeData(treeData, curKey, child, level) {
        const loop = (data) => {
            if (level < 1 || curKey.length - 3 > level * 2) return;
            data.forEach((item) => {
                if (curKey.indexOf(item.key) === 0) {
                    if (item.children) {
                        loop(item.children);
                    } else {
                        item.children = child;
                    }
                }
            });
        };
        loop(treeData);
        this.setLeaf(treeData, curKey, level);
    }

    setLeaf(treeData, curKey, level) {
        const loopLeaf = (data, lev) => {
            const l = lev - 1;
            data.forEach((item) => {
                if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 : curKey.indexOf(item.key) !== 0) {
                    return;
                }
                if (item.children) {
                    loopLeaf(item.children, l);
                } else if (l < 1) {
                    item.isLeaf = true;
                }
            });
        };
        loopLeaf(treeData, level + 1);
    }

    generateTreeNodes(treeNode) {
        const arr = [];
        const key = treeNode.props.eventKey;
        for (let i = 0; i < 3; i++) {
            arr.push({name: `leaf ${key}-${i}`, key: `${key}-${i}`});
        }
        return arr;
    }

    render() {
        const {unitTree, isFetching} = this.props;
        const loop = data => data.map((item) => {
            if (item.childrenKbaOuDTOs) {
                return <TreeNode title={item.name} key={`treenode_${item.created}`} isLeaf={item.leaf} disabled={item.key === "0-0-0"}>{loop(item.childrenKbaOuDTOs)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={`treenode_${item.created}`} isLeaf={item.leaf} disabled={item.key === "0-0-0"} />;
        });
        const treeNodes = loop(unitTree);


        return (
            <div>
                <h2>Baum?!</h2>
                <ul className="org-tree">
                    <li>
                        <span className="label label-default">
                            <span className="glyphicon glyphicon-menu-down" />
                            <span>System</span>
                        </span>
                        <ul>
                            <li>
                                <span className="label label-default">
                                    <span className="glyphicon glyphicon-menu-right" />
                                    <span>Node</span>
                                </span>
                            </li>
                            <li>
                                <span className="label label-default">
                                    <span className="glyphicon glyphicon-menu-down" />
                                    <span>Node</span>
                                </span>
                                <ul>
                                    <li>
                                        <span className="label label-default">
                                            <span className="glyphicon glyphicon-menu-right" />
                                            <span>Node</span>
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label label-default">
                                            <span className="glyphicon glyphicon-menu-down" />
                                            <span>Node</span>
                                        </span>
                                        <ul>
                                            <li>
                                                <span className="label label-default">
                                                    <span className="glyphicon glyphicon-menu-right" />
                                                    <span>Node</span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="label label-default">
                                                    <span className="glyphicon glyphicon-menu-right" />
                                                    <span>Node</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="label label-default">
                                            <span className="glyphicon glyphicon-menu-down" />
                                            <span>Node</span>
                                        </span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <br />
                <br />
                <br />
                {
                    isFetching ?
                        <div className="loader" />
                        :
                        <Tree
                            onSelect={this.onSelect}
                            loadData={this.onLoadData}
                        >
                            {treeNodes}
                        </Tree>
                }
            </div>
        );
    }
}

OrganizationUnitTreeView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    unitTree: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    selectedUnit: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {unittypes, units} = state;
    const typeList = unittypes.list;
    const typesAreLoaded = unittypes.isLoaded;
    const {unitTree, isFetching, selectedUnit} = units;

    return {
        unittypes, typeList, typesAreLoaded, unitTree, isFetching, selectedUnit,
    };
}

export default connect(mapStateToProps)(OrganizationUnitTreeView);
