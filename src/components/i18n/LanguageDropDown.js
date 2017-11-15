import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { DropdownButton } from 'react-bootstrap'

class LanguageDropDown extends React.Component {

    render() {
        const {intl, titleId, ...rest} = this.props;
        const formattedTitle = intl.formatMessage({
            id: titleId,
            defaultMessage: ""
        });

        return (
            <DropdownButton {...rest} id={this.props.id} title={formattedTitle}>
                {this.props.children}
            </DropdownButton>
        )
    }
}

LanguageDropDown.propTypes = {
    intl: intlShape.isRequired,
    titleId: PropTypes.string.isRequired
};

export default injectIntl(LanguageDropDown)
