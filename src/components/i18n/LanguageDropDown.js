import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import {DropdownButton} from 'react-bootstrap'

class LanguageDropDown extends React.Component {

    render() {
        const {intl, ...rest} = this.props;
        const { locale } = this.props.intl;
        const formattedTitle = intl.formatMessage({
            id: "header.dropdown.language."+ locale,
            defaultMessage: ""
        });

        return (
            <DropdownButton {...rest} title={formattedTitle} key={locale} id={`dropdown-basic-${locale}`}>
                {this.props.children}
            </DropdownButton>
        )
    }
}

LanguageDropDown.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(LanguageDropDown);
