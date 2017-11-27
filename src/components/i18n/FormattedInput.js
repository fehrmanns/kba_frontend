import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";


class FormattedInput extends React.Component {
    render() {
        // First get those props
        const { intl, placeholder, ...rest } = this.props;

        // Pass placeholder and internationalize it
        const fPlaceholder = intl.formatMessage({
            id: placeholder,
            defaultMessage: "",
        });

        return (
            <input placeholder={fPlaceholder} {...rest} />
        );
    }
}

FormattedInput.propTypes = {
    intl: intlShape.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default injectIntl(FormattedInput);
