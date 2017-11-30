import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";


class FormattedButton extends React.Component {
    render() {
        // First get those props
        const { intl, title, ...rest } = this.props;

        // Pass placeholder and internationalize it
        const fPlaceholder = intl.formatMessage({
            id: title,
            defaultMessage: "",
        });

        return (
            <button title={fPlaceholder} {...rest}>
                {this.props.children}
            </button>
        );
    }
}

FormattedButton.propTypes = {
    // eslint-disable-next-line react/no-typos
    intl: intlShape.isRequired,
    title: PropTypes.string.isRequired,
};

export default injectIntl(FormattedButton);
