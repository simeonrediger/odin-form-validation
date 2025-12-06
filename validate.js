import ruleSchemas from './rule-schemas.js';

export default function validate(value, rules, context) {
    const validity = {};

    for (const rule of rules) {
        const ruleDefinition = ruleSchemas[rule];
        const isValid = ruleDefinition.validate(value, context);
        validity[rule] = isValid;
    }

    return validity;
}
