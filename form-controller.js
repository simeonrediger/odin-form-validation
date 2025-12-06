import formFields from './form-fields.js';
import formFieldSchemas from './form-field-schemas.js';
import formView from './form-view.js';
import validate from './validate.js';

const fieldContexts = {};

function init() {
    formView.init();
    initFieldContexts();
    validateFields();
    bindEvents();
}

function validateFields() {
    Object.values(formFields).forEach(validateField);
}

function bindEvents() {
    formView.container.addEventListener('input', handleInput);
}

function handleInput(event) {
    const fieldElement = event.target.closest('[data-field]');

    if (!fieldElement) {
        return;
    }

    const field = formView.identifyFieldElement(fieldElement);
    validateField(field);
}

function validateField(field) {
    const value = formView.getFieldValue(field);
    const { rules } = formFieldSchemas[field];
    const context = fieldContexts[field];
    const validity = validate(value, rules, context);
    formView.renderValidity(field, validity);
}

function initFieldContexts() {
    const fields = Object.values(formFields);

    for (const field of fields) {
        const context = {};
        const dependees = formFieldSchemas[field].dependsOn;

        for (const dependee of dependees) {
            Object.defineProperty(context, dependee, {
                get() {
                    return formView.getFieldValue(dependee);
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
