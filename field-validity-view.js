import fieldRuleSchemas from './field-rule-schemas.js';

export default class FieldValidityView {
    #element;
    #rulesElement;

    constructor(element) {
        this.#element = element;
        this.#cacheElements();
        this.#positionRulesElement();
    }

    #cacheElements() {
        this.#rulesElement = this.#element.nextElementSibling;

        if (!this.#rulesElement.matches("[data-role='requirements']")) {
            throw new Error(
                'Requirements element must follow field element:',
                this.#element,
            );
        }
    }

    #positionRulesElement() {
        const formElement = document.querySelector('[data-form]');
        const formRect = formElement.getBoundingClientRect();
        const fieldRect = this.#element.getBoundingClientRect();
        this.#rulesElement.style.top = fieldRect.top - formRect.top + 'px';
        this.#rulesElement.style.left =
            fieldRect.right - formRect.left + 8 + 'px';
    }

    render(validity) {
        this.#rulesElement.innerHTML = '';

        for (const [rule, isValid] of Object.entries(validity)) {
            const ruleDescription = fieldRuleSchemas[rule].description;
            const ruleStatus = isValid ? '✅' : '❌';

            const ruleMessage = document.createElement('p');
            ruleMessage.classList.add('rule');
            ruleMessage.textContent = `${ruleStatus} ${ruleDescription}`;

            this.#rulesElement.append(ruleMessage);
        }
    }
}
