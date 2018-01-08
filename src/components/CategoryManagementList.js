import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import CategoryManagementListItem from "./CategoryManagementListItem";
import {getCategories} from "./../actions";

class CategoryManagementList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bundle: this.props.bundle,
        };

        this.props.dispatch(getCategories());
    }

    componentWillReceiveProps(nextProps) {
        (nextProps.bundle !== this.state.bundle) && this.setState({bundle: nextProps.bundle});
    }

    render() {
        const categoryList = this.props.bundle;

        return (
            <div className="category-list">
                <FormattedMessage tagName="h3" id="categorymanagement.list.headline" />
                {categoryList ?
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th><FormattedMessage id="categorymanagement.list.icon" /></th>
                                <th><FormattedMessage id="categorymanagement.list.name" /></th>
                                <th><FormattedMessage id="categorymanagement.list.description" /></th>
                                {/*
                            <th><FormattedMessage id="usermanagement.list.modified"/></th>
                            <th><FormattedMessage id="usermanagement.list.modifiedBy"/></th>
                            */}
                                <th>{/* placeholder for button */}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categoryList.map(item => <CategoryManagementListItem item={item} key={`CategoryItem.${item.name.replace(/\b[a-z]/g, letter => letter.toUpperCase()).replace(" ", "")}`} dispatch={this.props.dispatch} />)
                            }
                        </tbody>
                    </table>
                    :
                    <div className="loader">Loading...</div>
                }
            </div>
        );
    }
}

CategoryManagementList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    bundle: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const {categories} = state;
    const {bundle} = categories;

    return {
        bundle,
    };
}
export default connect(mapStateToProps)(CategoryManagementList);
