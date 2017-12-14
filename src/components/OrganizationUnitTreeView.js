import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import Tree, {TreeNode} from "rc-tree";

class OrganizationUnitTreeView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const gData = this.props.allUnits;
        console.log(gData);
        console.log(this.props.loadedUnit);
        /* const loop = data => data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode
                        key={item.key}
                        title={item.title}
                        disableCheckbox={item.key === "0-0-0-key"}
                    >
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={item.title} />;
        }); */
        return (
            <div />
            /* <Tree multiple defaultExpandAll >
                {loop(gData)}
            </Tree> */
        );
    }
}

OrganizationUnitTreeView.propTypes = {
    allUnits: PropTypes.array.isRequired,
    loadedUnit: PropTypes.object.isRequired,
};

export default OrganizationUnitTreeView;
