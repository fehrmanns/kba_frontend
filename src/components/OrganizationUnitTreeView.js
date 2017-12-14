import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import Tree, {TreeNode} from "rc-tree";
import {connect} from "react-redux";
import {getOrgUnit, logoutUser} from "../actions";

class OrganizationUnitTreeView extends React.Component {
    constructor(props) {
        super(props);

        this.getUnit("System");

        this.onSelect = this.onSelect.bind(this);
        this.onLoadData = this.onLoadData.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                treeData: [
                    { name: 'pNode 01', key: '0-0' },
                    { name: 'pNode 02', key: '0-1' },
                    { name: 'pNode 03', key: '0-2', isLeaf: true },
                ],
                checkedKeys: ['0-0'],
            });
        }, 100);

        this.getUnit = this.getUnit.bind(this);
    }

    getUnit(unitName) {
        this.props.dispatch(getOrgUnit(unitName)).then((response) => {
            if (response.message === "401") {
                this.props.dispatch(logoutUser());
            }
        });
    }

    onSelect(info) {
        console.log('onSelect', info);
    }

    onLoadData(treeNode) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const treeData = [...this.state.treeData];
                this.getNewTreeData(treeData, treeNode.props.eventKey, this.generateTreeNodes(treeNode), 2);
                this.setState({ treeData });
                resolve();
            }, 500);
        });
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
            arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` });
        }
        return arr;
    }

    render() {
        console.log("unitTree", this.props.unitTree);
        const {treeView} = this.props;
        const loop = (data) => {
            if (treeView) {
                return data.map((item) => {
                    if (item.children) {
                        return <TreeNode title={item.name} key={item.created}>{loop(item.children)}</TreeNode>;
                    }
                    return (
                        <TreeNode title={item.name} key={item.created} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />
                    );
                });
            } else {
                return <div />;
            }
        };
        const treeNodes = loop(treeView);


        return (
            <div>
                <h1>Baum?!</h1>
                <Tree
                    onSelect={this.onSelect}
                    loadData={this.onLoadData}
                >
                    {treeNodes}
                    {/* <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode> */}
                </Tree>
            </div>
            /* <Tree multiple defaultExpandAll >
                {loop(gData)}
            </Tree> */
        );
    }
}

OrganizationUnitTreeView.propTypes = {
    unitTree: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {unittypes, units} = state;
    const typeList = unittypes.list;
    const typesAreLoaded = unittypes.isLoaded;
    const {unitTree} = units;

    return {
        unittypes, typeList, typesAreLoaded, unitTree,
    };
}

export default connect(mapStateToProps)(OrganizationUnitTreeView);
