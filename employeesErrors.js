const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.emailId = !isEmpty(data.emailId) ? data.emailId : '';

    if (!Validator.isEmail(data.emailId)) {
        errors.emailId = 'Email is invalid';
    }
    if (Validator.isEmpty(data.emailId)) {
        errors.emailId = 'Email is required';
    }

    if (!Validator.isMobilePhone(data.contactNo)) {
        errors.contactNo = 'Contact Number must have 10 digits';
    }
    if (Validator.isEmpty(data.contactNo)) {
        errors.contactNo = 'Contact Number is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}