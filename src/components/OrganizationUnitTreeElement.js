import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {getOrgUnit, selectUnit} from "../actions";
import IconItem from "./IconItem";
import OrganisationUnitTreeElement from "./OrganizationUnitTreeElement";

class OrganizationUnitTreeElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openKnot: false,
            thisElement: this.props.treeElement,
            hasChildren: this.props.treeElement.leaf ? !this.props.treeElement.leaf : true,
            children: this.props.treeElement.childrenKbaOuDTOs,
            childLoadError: "",
            isFetching: true,
        };

        this.onSelect = this.onSelect.bind(this);
        this.toggleView = this.toggleView.bind(this);
    }

    componentWillMount() {
        if (this.state.thisElement.name && !this.state.thisElement.childrenKbaOuDTOs) {
            this.getChildren(this.state.thisElement.name);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.thisElement !== nextProps.treeElement) {
            this.setState({
                thisElement: nextProps.treeElement,
                hasChildren: !nextProps.treeElement.leaf,
            });
            this.getChildren(nextProps.treeElement.name);
        }
        if (this.state.thisElement.name === nextProps.unitTree.name && nextProps.unitTree.childrenKbaOuDTOs) {
            const hasChildren = !!nextProps.unitTree.childrenKbaOuDTOs;
            this.setState({
                children: nextProps.unitTree.childrenKbaOuDTOs,
                isFetching: false,
                hasChildren,
            });
        }
    }


    onSelect(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.dispatch(selectUnit(this.state.thisElement));
        console.log(`${this.state.thisElement.name} selected`);
    }

    //TODO add key functionality
    onKeyPress() {
        console.log("key press on element.");
    }

    getChildren(name) {
        this.props.dispatch(getOrgUnit(name));
    }

    toggleView(e) {
        e.preventDefault();
        e.stopPropagation();

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
            isFetching,
            childLoadError,
        } = this.state;
        const {
            treeElement,
            selectedUnit,
        } = this.props;
console.log("unittypes", this.props.types);
        const activeClass = (selectedUnit.name === thisElement.name) ? "btn btn-sm btn-default active focus" : "btn btn-sm btn-default";
        const toggleClass = openKnot ? "glyphicon glyphicon-menu-down" : "glyphicon glyphicon-menu-right";
        const showChildren = hasChildren && openKnot;

        return (
            <li>
                <span className="btn-group">
                    {hasChildren &&
                        <button className="btn btn-sm btn-default" onKeyPress={this.onKeyPress} onClick={this.toggleView}>
                            {isFetching ?
                                <div className="loader-container">
                                    <span className="loader" />
                                </div>
                                :
                                <span className={toggleClass} />
                            }
                        </button>
                    }
                    <button className={activeClass} onKeyPress={this.onKeyPress} onClick={this.onSelect}>
                        <IconItem size={16} titleId={treeElement.name} icon="blackboard" selectedItem={() => {}} />
                        <span className="knot-name">{treeElement.name}</span>
                    </button>
                </span>
                {showChildren &&
                <ul>
                    {childLoadError ?
                        <li>
                            <span className="label label-danger">
                                <FormattedMessage tagName="span" id="alert.message.childunitnotloaded" />
                            </span>
                        </li>
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
    types: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const {units, unittypes} = state;
    const {selectedUnit, unitTree, isFetching} = units;
    const types = unittypes.list;

    return {selectedUnit, unitTree, types, isFetching};
}

export default connect(mapStateToProps)(OrganizationUnitTreeElement);
