import fields from './fields.js';
import fieldSchemas from './field-schemas.js';
import view from './form-view.js';
import validate from './validate.js';

const fieldContexts = {};

function init() {
    view.init();
    initFieldContexts();
    validateFields();
    bindEvents();
}

function validateFields() {
    Object.values(fields).forEach(validateField);
}

function bindEvents() {
    view.container.addEventListener('input', handleInput);
    view.container.addEventListener('submit', handleSubmit);
}

function handleInput(event) {
    const fieldElement = event.target.closest('[data-field]');

    if (!fieldElement) {
        return;
    }

    const field = view.identifyFieldElement(fieldElement);

    if (field === fields.COUNTRY) {
        view.renderPostalCodeLabel();
    }

    validateField(field);
}

function handleSubmit(event) {
    event.preventDefault();
}

function validateField(field) {
    const value = view.getFieldValue(field);
    const { rules } = fieldSchemas[field];
    const context = fieldContexts[field];
    const validity = validate(value, rules, context);
    view.renderValidity(field, validity);
    validateDependentFields(field);
}

function validateDependentFields(field) {
    const dependentFields = Object.keys(fieldSchemas).filter(fieldKey =>
        fieldSchemas[fieldKey].dependsOn.includes(field),
    );

    dependentFields.forEach(validateField);
}

function initFieldContexts() {
    for (const field of Object.values(fields)) {
        const context = {};
        const dependees = fieldSchemas[field].dependsOn;

        for (const dependee of dependees) {
            Object.defineProperty(context, dependee, {
                get() {
                    return view.getFieldValue(dependee);
                },
            });
        }

        fieldContexts[field] = context;
    }
}

const formController = {
    init,
};

export default formController;
