import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setRights} from "../actions";

class RightManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            restServices: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.kbaRestServices !== this.state.restServices) {
            this.setState({restServices: nextProps.kbaRestServices});
            this.formatRights(nextProps.kbaRestServices);
        }
    }

    formatRights(newRights) {
        const formattedRights = Object.assign({}, this.props.rights, {});
        if (newRights) {
            for (let i = 0; i < newRights.length; i += 1) {
                const {path} = newRights[i];
                const pathSegment = path.substr(path.lastIndexOf("/") + 1, path.length).toLowerCase();
                if (formattedRights[pathSegment]) {
                    formattedRights[pathSegment][newRights[i].method.toLowerCase()] = true;
                }
            }
        }
        this.props.dispatch(setRights(formattedRights));
    }

    render() {
        return (<div />);
    }
}

RightManagement.defaultProps = {
    kbaRestServices: [],
};

RightManagement.propTypes = {
    dispatch: PropTypes.func.isRequired,
    rights: PropTypes.object.isRequired,
    kbaRestServices: PropTypes.array,
};

function mapStateToProps(state) {
    const {auth} = state;
    const {rights} = auth;
    const {kbaRestServices} = auth.user;

    return {rights, auth, kbaRestServices};
}

export default connect(mapStateToProps)(RightManagement);

