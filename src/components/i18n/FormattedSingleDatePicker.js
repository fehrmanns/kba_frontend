import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import {SingleDatePicker} from "react-dates";


class FormattedSingleDatePicker extends React.Component {
    render() {
        // First get those props
        const { intl, placeholder, ...rest } = this.props;

        // Pass placeholder and internationalize it
        const fPlaceholder = intl.formatMessage({
            id: placeholder,
            defaultMessage: "",
        });

        return (
            <SingleDatePicker placeholder={fPlaceholder} {...rest} />
        );
    }
}

FormattedSingleDatePicker.propTypes = {
    // eslint-disable-next-line react/no-typos
    intl: intlShape.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default injectIntl(FormattedSingleDatePicker);
