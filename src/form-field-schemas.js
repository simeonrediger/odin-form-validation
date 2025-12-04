import fields from './form-fields.js';
import rules from './field-rules.js';

const formFieldSchemas = {
    [fields.EMAIL]: {
        id: 'email',
        rules: [rules.REQUIRED, rules.EMAIL],
        dependents: [],
    },
    [fields.COUNTRY]: {
        id: 'country',
        rules: [rules.REQUIRED],
        dependents: [fields.POSTAL_CODE],
    },
    [fields.POSTAL_CODE]: {
        id: 'postal-code',
        rules: [rules.REQUIRED, rules.POSTAL_CODE],
        dependents: [],
    },
    [fields.PASSWORD]: {
        id: 'password',
        rules: [rules.REQUIRED],
        dependents: [fields.PASSWORD_CONFIRMATION],
    },
    [fields.PASSWORD_CONFIRMATION]: {
        id: 'password-confirmation',
        rules: [rules.REQUIRED, rules.PASSWORD_CONFIRMATION],
        dependents: [],
    },
};

export default formFieldSchemas;
