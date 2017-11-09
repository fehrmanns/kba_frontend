import React, { PropTypes } from 'react';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';
import DropdownButton from 'react-bootstrap';

class FormattedDropDown extends DropdownButton {

    constructor(props){
        super(props);
    }

    getMessageKey(eventKey) {
        return "header.dropdown.language." + eventKey;
    };

    render() {
        return (
            ({ locale, changeLanguage, intl }) => (
                <DropdownButton bsStyle="default" key={locale} id={`dropdown-basic-${locale}`}>
                    {//onSelect={(eventKey) => changeLanguage(eventKey)}
                    //title={intl.formatMessage(this.getMessageKey(eventKey))}
                    }
                    {this.props.children}
                </DropdownButton>
            )
        )    
    }
}
    FormattedDropDown.propTypes = {
        intl: intlShape.isRequired,
        changeLanguage: PropTypes.func.isRequired,
        locale: PropTypes.string.isRequired
    };
export default injectIntl(FormattedDropDown);
