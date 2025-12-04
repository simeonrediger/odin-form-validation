import fields from './form-fields.js';
import form from './form-model.js';
import rules from './field-rules.js';

const fieldRuleSchemas = {
    [rules.REQUIRED]: {
        description: 'Required',
        errorMessage: 'This field cannot be empty',
        validate: isValidRequiredValue,
    },
    [rules.EMAIL]: {
        description: 'Valid email address',
        errorMessage: 'Invalid email address',
        validate: isValidEmail,
    },
    [rules.POSTAL_CODE]: {
        description: 'Valid postal code',
        errorMessage: 'Invalid postal code',
        validate: isValidPostalCode,
    },
    [rules.PASSWORD_CONFIRMATION]: {
        description: 'Passwords match',
        errorMessage: 'Passwords do not match',
        validate: isValidPasswordConfirmation,
    },
};

function isValidRequiredValue(value) {
    return value !== '';
}

function isValidEmail(value) {
    return /^\S+@\S+\.\S+$/.test(value);
}

function isValidPostalCode(value) {
    const country = form.getFieldValue(fields.COUNTRY);
    let countryPostalCodePattern;

    switch (country) {
        case 'fr':
            countryPostalCodePattern = /^(F-)?\d{5}$/;
            break;
        case 'de':
            countryPostalCodePattern = /^(D-)?\d{5}$/;
            break;
        case 'nl':
            countryPostalCodePattern =
                /^(NL-)?\d{4}\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$/;
            break;
        case 'ch':
            countryPostalCodePattern = /^(CH-)?\d{4}$/;
            break;
        case 'us':
            countryPostalCodePattern = /^\d{5}$/;
            break;
        default:
            return false;
    }

    return countryPostalCodePattern.test(value);
}

function isValidPasswordConfirmation(value) {
    const password = form.getFieldValue(fields.PASSWORD);
    return value === password;
}

export default fieldRuleSchemas;
