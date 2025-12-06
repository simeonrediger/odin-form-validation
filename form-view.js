import fields from './fields.js';
import fieldSchemas from './field-schemas.js';
import FieldValidityView from './field-validity-view.js';

let container;
let submitButton;
const fieldElements = {};
const fieldValidityViews = {};

function init() {
    cacheElements();
    renderPostalCodeLabel();
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
        fieldValidityViews[field] = new FieldValidityView(fieldElement, field);
    }
}

function identifyFieldElement(fieldElement) {
    const field = Object.keys(fieldElements).find(
        field => fieldElements[field] === fieldElement,
    );

    return field;
}

function getFieldValue(field) {
    return fieldElements[field].value;
}

function renderPostalCodeLabel() {
    const label = container.querySelector("[data-label='postal-code']");
    const country = getFieldValue(fields.COUNTRY);
    label.textContent = country === 'us' ? 'ZIP code' : 'Postal code';
}

function renderValidity(field, validity) {
    fieldValidityViews[field].render(validity);
}

const formView = {
    init,
    identifyFieldElement,
    getFieldValue,
    renderPostalCodeLabel,
    renderValidity,

    get container() {
        return container;
    },
};

export default formView;
