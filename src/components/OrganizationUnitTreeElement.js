import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {selectUnit, getOrgUnit} from "../actions";
import OrganisationUnitTreeElement from './OrganizationUnitTreeElement';

class OrganizationUnitTreeElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openKnot: false,
            thisElement: this.props.treeElement,
            hasChildren: !this.props.treeElement.leaf,
            children: this.props.treeElement.childrenKbaOuDTOs,
        };

        this.onSelect = this.onSelect.bind(this);
        this.toggleView = this.toggleView.bind(this);
        console.log("component new load", this.props.treeElement);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            thisElement: nextProps.treeElement,
            hasChildren: !nextProps.treeElement.leaf,
            children: nextProps.treeElement.childrenKbaOuDTOs,
        });
    }

    onSelect(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.dispatch(selectUnit(this.state.thisElement));
    }

    onKeyPress() {
        console.log("key press on element.");
    }

    getChildChildren() {
        this.state.children.map((child) => {
            console.log("ask for child", this.state.children[0].name);
            this.props.dispatch(getOrgUnit(child.name)).then(response => console.log("full item", response.childrenKbaOuDTOs));
        });
    }

    toggleView(e) {
        e.preventDefault();
        e.stopPropagation();

        this.getChildChildren();
        this.setState({
            openKnot: !this.state.openKnot,
        });
    }


    render() {
        const {
            openKnot,
            hasChildren,
            thisElement,
            children,
        } = this.state;
        const {
            treeElement,
            selectedUnit,
            isFetching,
        } = this.props;
        const nodeClass = (selectedUnit.name === thisElement.name) ? "label label-default selected" : "label label-default";
        const toggleClass = openKnot ? "glyphicon glyphicon-menu-down" : "glyphicon glyphicon-menu-right";
        const showChildren = hasChildren && openKnot;

        return (
            <li>
                <span className={nodeClass}>
                    <span role="button" tabIndex={0} onKeyPress={this.onKeyPress} onClick={this.toggleView} className={toggleClass} />
                    <span role="button" tabIndex={0} onKeyPress={this.onKeyPress} onClick={this.onSelect}>{treeElement.name}</span>
                </span>
                {showChildren &&
                <ul>
                    {isFetching ?
                        <div className="loader" />
                        :
                        children.map(child => (<OrganisationUnitTreeElement key={`orgUnitTreeElement${child.name}`} treeElement={child} />))
                    }
                </ul>
                }
            </li>
        );
    }
}

OrganizationUnitTreeElement.propTypes = {
    dispatch: PropTypes.func.isRequired,
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
