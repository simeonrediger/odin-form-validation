import fieldRuleSchemas from './field-rule-schemas.js';

export default class FieldValidityView {
    #fieldElement;
    #rulesElement;

    constructor(element) {
        this.#fieldElement = element;
        this.#cacheElements();
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

    #positionRulesElement() {
        const formElement = document.querySelector('[data-form]');
        const formRect = formElement.getBoundingClientRect();
        const fieldRect = this.#fieldElement.getBoundingClientRect();
        this.#rulesElement.style.top = fieldRect.top - formRect.top + 'px';
        this.#rulesElement.style.left =
            fieldRect.right - formRect.left + 8 + 'px';
    }

    render(validity) {
        this.#rulesElement.innerHTML = '';
        let firstInvalidRule;

        for (const [rule, isValid] of Object.entries(validity)) {
            const ruleDescription = fieldRuleSchemas[rule].description;
            const ruleStatus = isValid ? '✅' : '❌';

            const ruleMessage = document.createElement('p');
            ruleMessage.classList.add('rule');
            ruleMessage.textContent = `${ruleStatus} ${ruleDescription}`;

            this.#rulesElement.append(ruleMessage);

            if (!firstInvalidRule && !isValid) {
                firstInvalidRule = rule;
            }
        }

        if (firstInvalidRule) {
            const { errorMessage } = fieldRuleSchemas[firstInvalidRule];
            this.#fieldElement.setCustomValidity(errorMessage);
        } else {
            this.#fieldElement.setCustomValidity('');
        }
    }
}
