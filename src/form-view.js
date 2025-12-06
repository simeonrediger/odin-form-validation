import fields from './form-fields.js';
import fieldSchemas from './form-field-schemas.js';

let formElement;
let submitButton;
const fieldElements = {};

function init() {
    cacheElements();
}

function cacheElements() {
    formElement = document.querySelector('[data-form]');
    submitButton = document.querySelector("[data-action='submit']");

    for (const field of Object.values(fields)) {
        const fieldId = fieldSchemas[field].id;
        const fieldElement = formElement.querySelector(`#${fieldId}`);
        fieldElements[field] = fieldElement;
    }
}

function getFieldValue(field) {
    return fieldElements[field].value;
}

function renderValidity(field, validity) {}

const formView = {
    init,
    getFieldValue,
    renderValidity,
};

export default formView;
