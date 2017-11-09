import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {DropdownButton} from 'react-bootstrap';

class FormattedDropDown extends React.Component {

    getMessageKey(eventKey) {
        return "header.dropdown.language." + eventKey;
    };

    render() {
        const {intl, ...rest} = this.props;
        const formattedTitle = intl.formatMessage({
            id: "header.dropdown.language."+this.props.locale,
            defaultMessage: ""
        })
        return (
            <DropdownButton {...rest} title={formattedTitle} key={this.props.locale} id={`dropdown-basic-${this.props.locale}`}>
                {this.props.children}
            </DropdownButton>
        )
    }
}

FormattedDropDown.propTypes = {
    intl: intlShape.isRequired,
    //changeLanguage: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired
};

//FormattedDropDown = injectIntl(FormattedDropDown);
export default injectIntl(FormattedDropDown);
