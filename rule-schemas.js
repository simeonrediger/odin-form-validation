import fields from './fields.js';
import rules from './rules.js';

const ruleSchemas = {
    [rules.REQUIRED]: {
        description: 'Required',
        errorMessage: 'This field cannot be empty',
        validate: isNotEmpty,
    },
    [rules.VALID_EMAIL]: {
        description: 'Valid email address',
        errorMessage: 'Invalid email address',
        validate: isValidEmail,
    },
    [rules.VALID_POSTAL_CODE]: {
        description: 'Valid postal code',
        errorMessage: 'Invalid postal code',
        validate: isValidPostalCode,
    },
    [rules.PASSWORD_CONFIRMATION_MATCHES_PASSWORD]: {
        description: 'Passwords match',
        errorMessage: 'Passwords do not match',
        validate: passwordConfirmationMatchesPassword,
    },
};

function isNotEmpty(value) {
    return value !== '';
}

function isValidEmail(value) {
    return /^\S+@\S+\.\S+$/.test(value);
}

function isValidPostalCode(value, context) {
    const country = context[fields.COUNTRY];
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

function passwordConfirmationMatchesPassword(value, context) {
    const password = context[fields.PASSWORD];
    return value === password;
}

export default ruleSchemas;
