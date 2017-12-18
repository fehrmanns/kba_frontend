import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {selectUnit} from "../actions";
import OrganisationUnitTreeElement from './OrganizationUnitTreeElement';

class OrganizationUnitTreeElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openKnot: false,
            hasChildren: true,
            thisElement: this.props.treeElement,
        };

        this.onSelect = this.onSelect.bind(this);
        this.toggleView = this.toggleView.bind(this);
    }

    onSelect(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.dispatch(selectUnit(this.state.thisElement));
        console.log("onSelect", this.state.thisElement);
    }

    onKeyPress() {
        console.log("key press on element.");
    }

    toggleView(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Toggle element.");
        this.setState({
            openKnot: !this.state.openKnot,
        });
    }


    render() {
        const {
            toggleChildren,
            openKnot,
            hasChildren,
            thisElement,
        } = this.state;
        const {unitTree, selectedUnit, isFetching} = this.props;
        const nodeClass = (selectedUnit.name === thisElement.name) ? "label label-default selected" : "label label-default";
        const toggleClass = openKnot ? "glyphicon glyphicon-menu-down" : "glyphicon glyphicon-menu-right";
        const showChildren = hasChildren && toggleChildren;

        return (
            <li>
                <span className={nodeClass}>
                    <span role="button" tabIndex={0} onKeyPress={this.onKeyPress} onClick={this.toggleView} className={toggleClass} />
                    <span role="button" tabIndex={0} onKeyPress={this.onKeyPress} onClick={this.onSelect}>{unitTree.name}</span>
                </span>
                {showChildren &&
                <ul>
                    {isFetching ?
                        <div className="loader" />
                        :
                        <ul className="org-tree">
                            <OrganisationUnitTreeElement treeElement={unitTree} />
                        </ul>
                    }
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
                }
            </li>
        );
    }
}

OrganizationUnitTreeElement.propTypes = {
    dispatch: PropTypes.func.isRequired,
    unitTree: PropTypes.object.isRequired,
    selectedUnit: PropTypes.object.isRequired,
    treeElement: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {units} = state;
    const {selectedUnit, unitTree, isFetching} = units;

    return { selectedUnit, unitTree, isFetching };
}

export default connect(mapStateToProps)(OrganizationUnitTreeElement);
