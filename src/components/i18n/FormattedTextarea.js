import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";


class FormattedTextarea extends React.Component {
    render() {
        // First get those props
        const { intl, placeholder, ...rest } = this.props;

        // Pass placeholder and internationalize it
        const fPlaceholder = intl.formatMessage({
            id: placeholder,
            defaultMessage: "",
        });

        return (
            <textarea placeholder={fPlaceholder} {...rest} />
        );
    }
}

FormattedTextarea.propTypes = {
    // eslint-disable-next-line react/no-typos
    intl: intlShape.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default injectIntl(FormattedTextarea);
