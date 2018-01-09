import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {getOrgUnit, selectUnit, resetUnitUpdateStatus} from "../actions";
import OrganisationUnitTreeElement from "./OrganizationUnitTreeElement";

class OrganizationUnitTreeElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openKnot: false,
            icon: "",
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
        // SET ELEMENT WHEN THERE IS NO ELEMENT-NAME
        if ((!this.state.thisElement.name && nextProps.treeElement.name)) {
            this.setState({
                thisElement: nextProps.treeElement,
                hasChildren: !nextProps.treeElement.leaf,
            });
            this.getChildren(nextProps.treeElement.name);
        }
        // SET NEW CHILDREN WHEN THEY ARE GIVEN AND THE UPDATE NAME IS THE SAME AS THE NAME FROM THE ELEMENT
        if (this.state.thisElement.name === nextProps.unitTree.name && nextProps.unitTree.childrenKbaOuDTOs) {
            const hasChildren = !!nextProps.unitTree.childrenKbaOuDTOs;
            this.setState({
                children: nextProps.unitTree.childrenKbaOuDTOs,
                isFetching: false,
                hasChildren,
            });
        }
        // SET ICON WHEN NON IS GIVEN
        if (!this.state.icon) {
            const icon = nextProps.treeElement.kbaOuTypeIconLocation;
            this.setState({
                icon,
            });
        }
        // DO UPDATE WHEN UPDATE-ELEMENT IS THIS ELEMENT AND THE UPDATE HAS HAPPEN
        const {thisElement} = this.state;
        if (nextProps.orgUnitToUpdate === thisElement.name) {
            if (nextProps.updateSuccess && Object.getOwnPropertyNames(nextProps.orgUnitChildUpdate).length) {
                this.getChildren(this.state.thisElement.name);
                this.props.dispatch(resetUnitUpdateStatus());
            }
            if (nextProps.updateSuccess && Object.getOwnPropertyNames(nextProps.orgUnitUpdate).length) {
                // SET NEW ICON WHEN THE TYPE-NAME HAS CHANGED
                const iconType = nextProps.types.filter(type => type.name === nextProps.orgUnitUpdate.kbaOuTypeName);
                const icon = (iconType.length > 0) ? iconType[0].iconLocation : "";
                this.setState({
                    icon,
                });
                // ADD ELEMENT UPDATE
                if (nextProps.orgUnitUpdate.name !== thisElement.name || nextProps.orgUnitUpdate.kbaOuTypeName !== thisElement.kbaOuTypeName) {
                    this.setState({
                        thisElement: Object.assign({}, thisElement, nextProps.orgUnitUpdate),
                    });
                }
                this.props.dispatch(resetUnitUpdateStatus());
            }
        }
    }

    onSelect(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.dispatch(selectUnit(this.state.thisElement));
    }

    // TODO add key functionality
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
            icon,
        } = this.state;
        const {
            selectedUnit,
        } = this.props;

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
                        {icon && <span title={icon} className={`icon iconexperience-16-${icon}`} />}
                        <span className="knot-name">{thisElement.name}</span>
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
    updateSuccess: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {units, unittypes} = state;
    const {
        selectedUnit, unitTree, isFetching, orgUnitToUpdate, orgUnitUpdate, updateSuccess, orgUnitChildUpdate,
    } = units;
    const types = unittypes.list;

    return {
        selectedUnit, unitTree, isFetching, orgUnitToUpdate, orgUnitUpdate, updateSuccess, types, orgUnitChildUpdate,
    };
}

export default connect(mapStateToProps)(OrganizationUnitTreeElement);
