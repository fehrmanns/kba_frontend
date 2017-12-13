import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "./../css/progress.css";

class Progress extends React.Component {
    render() {
        let progressClass = "progress-bar";
        this.props.isFetching && (progressClass += " progress-bar-striped active");

        return (
            <div className="row progress">
                <div className={progressClass} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" />
            </div>
        );
    }
}

Progress.propTypes = {
    isFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {
        auth,
        token,
        users,
        unittypes,
    } = state;

    const isFetching = auth.isFetching || token.isFetching || users.isFetching || unittypes.isFetching;

    return {
        isFetching,
    };
}

export default connect(mapStateToProps)(Progress);
