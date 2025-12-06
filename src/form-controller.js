import formFields from './form-fields.js';

function init() {
    validateFields();
}

function validateFields() {
    Object.values(formFields).forEach(validateField);
}

function validateField(field) {}

const formController = {
    init,
};

export default formController;
