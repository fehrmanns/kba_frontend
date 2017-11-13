
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {DropdownButton} from 'react-bootstrap';

class LanguageDropDown extends React.Component {

    getMessageKey(eventKey) {
        return "header.dropdown.language." + eventKey;
    };

    render() {
        const {intl, locale, ...rest} = this.props;
        const formattedTitle = intl.formatMessage({
            id: "header.dropdown.language."+ locale,
            defaultMessage: ""
        })
        return (
            <DropdownButton {...rest} title={formattedTitle} key={locale} id={`dropdown-basic-${locale}`}>
                {this.props.children}
            </DropdownButton>
        )
    }
}

LanguageDropDown.propTypes = {
    intl: intlShape.isRequired,
    locale: PropTypes.string.isRequired
};

export default injectIntl(LanguageDropDown);
