import fields from './form-fields.js';
import fieldSchemas from './form-field-schemas.js';
import FieldValidityView from './field-validity-view.js';

let container;
let submitButton;
const fieldElements = {};
const fieldValidityViews = {};

function init() {
    cacheElements();
    initFieldValidityViews();
}

function cacheElements() {
    container = document.querySelector('[data-form]');
    submitButton = document.querySelector("[data-action='submit']");

    for (const field of Object.values(fields)) {
        const fieldId = fieldSchemas[field].id;
        const fieldElement = container.querySelector(`#${fieldId}`);
        fieldElements[field] = fieldElement;
    }
}

function initFieldValidityViews() {
    for (const [field, fieldElement] of Object.entries(fieldElements)) {
        fieldValidityViews[field] = new FieldValidityView(fieldElement);
    }
}

function getFieldValue(field) {
    return fieldElements[field].value;
}

function renderValidity(field, validity) {
    fieldValidityViews[field].render(validity);
}

const formView = {
    init,
    getFieldValue,
    renderValidity,
};

export default formView;
