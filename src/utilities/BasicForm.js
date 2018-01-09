import React from 'react';
import validator from 'validator';

class BasicForm extends React.Component {

	onChange = e => {
		if (e.target.getAttribute('validateonchange')) this.validateField(e.target);
		return this.setState({
			data: {...this.state.data, [e.target.name]: e.target.value}
		});
	};

	validateOnBlur = e =>
		this.validateField(e.target, e);


	validateField = (targetElement) => {
		const validators = targetElement.getAttribute('validators').split(',');
		const {errors} = this.state;
		delete errors[targetElement.name];
		validators.forEach(type => {
			switch (type.trim()) {
				case 'email': {
					if (!validator.isEmail(targetElement.value)) {
						errors[targetElement.name] = 'Not valid email address';
					}
					break;
				}
				case 'equalTo': {
					const name = targetElement.getAttribute('validequalto');
					if (name) {
						const element = document.getElementsByName(name)[0];
						if (element.value !== targetElement.value) {
							errors[targetElement.name] = `This field must be equal to ${name}`;
						}
					}
					break;
				}
				case 'required': {
					if (validator.isEmpty(targetElement.value)) {
						errors[targetElement.name] = 'This field cannot be empty';
					}
					break;
				}
				default:
					break;
			}
		});
		this.setState({errors});
		return errors;
	};

	validateForm = e => {
		const elements = e.target.elements.length > 0 ? Array.from(e.target.elements) : [];
		const fields = elements.filter(item => !!item.getAttribute('validators'));
		return fields.forEach(field => this.validateField(field));
	}
}

export default BasicForm;
