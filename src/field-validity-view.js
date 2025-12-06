import ruleSchemas from './rule-schemas.js';
import fieldSchemas from './field-schemas.js';

export default class FieldValidityView {
    #fieldElement;
    #rulesElement;

    constructor(fieldElement, field) {
        this.#fieldElement = fieldElement;
        this.#cacheElements();
        this.#initRulesElement(field);
        this.#positionRulesElement();
    }

    #cacheElements() {
        this.#rulesElement = this.#fieldElement.nextElementSibling;

        if (!this.#rulesElement.matches("[data-role='requirements']")) {
            throw new Error(
                'Requirements element must follow field element:',
                this.#fieldElement,
            );
        }
    }

    #initRulesElement(field) {
        this.#rulesElement.innerHTML = '';
        const rules = fieldSchemas[field].rules;

        for (const rule of rules) {
            const ruleStatus = document.createElement('span');
            ruleStatus.dataset.ruleStatus = '';

            const ruleDescription = document.createElement('span');
            ruleDescription.textContent = ruleSchemas[rule].description;

            const ruleMessage = document.createElement('p');
            ruleMessage.dataset.rule = rule;
            ruleMessage.classList.add('rule');
            ruleMessage.append(ruleStatus, ruleDescription);

            this.#rulesElement.append(ruleMessage);
        }
    }

    #positionRulesElement() {
        const formElement = document.querySelector('[data-form]');
        const formRect = formElement.getBoundingClientRect();
        const fieldRect = this.#fieldElement.getBoundingClientRect();
        this.#rulesElement.style.top = fieldRect.top - formRect.top + 'px';
        this.#rulesElement.style.left =
            fieldRect.right - formRect.left + 8 + 'px';
    }

    render(validity) {
        for (const [rule, isValid] of Object.entries(validity)) {
            this.#renderRuleStatus(rule, isValid);
        }

        this.#setFieldValidity(validity);
    }

    #renderRuleStatus(rule, isValid) {
        const ruleStatus = this.#rulesElement.querySelector(
            `[data-rule='${rule}'] [data-rule-status]`,
        );

        ruleStatus.textContent = isValid ? '✅' : '❌';
    }

    #setFieldValidity(validity) {
        const firstViolatedRule = Object.keys(validity).find(
            rule => !validity[rule],
        );

        const errorMessage = ruleSchemas[firstViolatedRule]?.errorMessage;
        this.#fieldElement.setCustomValidity(errorMessage ?? '');
    }
}
