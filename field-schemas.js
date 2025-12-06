import fields from './fields.js';
import rules from './rules.js';

const fieldSchemas = {
    [fields.EMAIL]: {
        id: 'email',
        rules: [rules.REQUIRED, rules.VALID_EMAIL],
        dependsOn: [],
    },
    [fields.COUNTRY]: {
        id: 'country',
        rules: [rules.REQUIRED],
        dependsOn: [],
    },
    [fields.POSTAL_CODE]: {
        id: 'postal-code',
        rules: [rules.REQUIRED, rules.VALID_POSTAL_CODE],
        dependsOn: [fields.COUNTRY],
    },
    [fields.PASSWORD]: {
        id: 'password',
        rules: [rules.REQUIRED],
        dependsOn: [],
    },
    [fields.PASSWORD_CONFIRMATION]: {
        id: 'password-confirmation',
        rules: [rules.REQUIRED, rules.PASSWORD_CONFIRMATION_MATCHES_PASSWORD],
        dependsOn: [fields.PASSWORD],
    },
};

export default fieldSchemas;
