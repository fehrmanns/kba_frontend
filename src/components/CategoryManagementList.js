import React from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
// import CategoryManagementListItem from "./CategoryManagementListItem";

export default class CategoryManagementList extends React.Component {
    render() {

        return (
            <div>
                <FormattedMessage tagName="h3" id="categorymanagement.list.headline" />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="categorymanagement.list.icon" /></th>
                            <th><FormattedMessage id="categorymanagement.list.name" /></th>
                            {/*
                            <th><FormattedMessage id="usermanagement.list.modified"/></th>
                            <th><FormattedMessage id="usermanagement.list.modifiedBy"/></th>
                            */}
                            <th>{/* placeholder for button */}</th>
                            <th>{/* placeholder for button */}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // users.map(userItem => <CategoryManagementListItem key={`ListItem.${userItem.loginName}`} currentUser={currentUser} userItem={userItem} updateUser={updateUser} deleteUser={deleteUser} />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

CategoryManagementList.propTypes = {

};
