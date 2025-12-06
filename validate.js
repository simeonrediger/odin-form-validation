import fieldRuleSchemas from './field-rule-schemas.js';

export default function validate(value, rules) {
    const validity = {};

    for (const rule of rules) {
        const ruleDefinition = fieldRuleSchemas[rule];
        const isValid = ruleDefinition.validate(value);
        validity[rule] = isValid;
    }

    return validity;
}
