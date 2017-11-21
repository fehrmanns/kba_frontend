import React from 'react'
import PropTypes from 'prop-types'
import {FormattedDate, FormattedMessage} from 'react-intl'


class UserManagementListItem extends React.Component {

    render() {
        const user = this.props.userItem;

        return (
            <tr>
                <td>{!!user.loginName && user.loginName}</td>
                <td>{!!user.firstName && user.firstName}</td>
                <td>{!!user.lastName && user.lastName}</td>
                <td>{!!user.roleName && user.roleName}</td>
                <td>
                    {!!user.created &&
                    <FormattedDate
                        value={user.created}
                        day="2-digit"
                        month="short"
                        year="numeric"/>
                    }
                </td>
                {/*
                <td>
                    {!!user.modified &&
                    <FormattedDate
                    value={user.modified}
                    day="2-digit"
                    month="short"
                    year="numeric" />
                    }
                </td>
                <td>{!!user.modifiedBy && user.modifiedBy}</td>
                */}
                <td>
                    <button className="btn btn-xs btn-warning" onClick={() => this.props.updateUser(user.loginName)}>
                        <FormattedMessage id="button.user.update"/>
                    </button>
                </td>
                <td>
                    <button className="btn btn-xs btn-danger" onClick={() => this.props.deleteUser(user.loginName)}>
                        <FormattedMessage id="button.user.delete"/>
                    </button>
                </td>
            </tr>
        )
    }
}

UserManagementListItem.propTypes = {
    userItem: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
};

export default UserManagementListItem
