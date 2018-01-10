import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";


class FormattedIcon extends React.Component {
    render() {
        // First get those props
        const { intl, title, ...rest } = this.props;

        // Pass placeholder and internationalize it
        const fPlaceholder = intl.formatMessage({
            id: title,
            defaultMessage: "",
        });

        return (
            <span title={fPlaceholder} className={this.props.className} {...rest}>
                {this.props.children}
            </span>
        );
    }
}

FormattedIcon.propTypes = {
    // eslint-disable-next-line react/no-typos
    intl: intlShape.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};

export default injectIntl(FormattedIcon);
