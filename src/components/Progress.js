import React from 'react'
import PropTypes from 'prop-types'
import './../css/progress.css'

export default class Progress extends React.Component {

    render() {
        const { isActive } = this.props;
        let progressClass = "progress-bar";
        isActive && (progressClass = progressClass + " progress-bar-striped active");

        return (
            <div className="progress">
                <div className={progressClass} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        );
    }
}

Progress.propTypes = {
    isActive: PropTypes.bool.isRequired
};
