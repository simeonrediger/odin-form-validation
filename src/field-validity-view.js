export default class FieldValidityView {
    #element;
    #rulesElement;

    constructor(element) {
        this.#element = element;
        this.#rulesElement = this.#element.nextElementSibling;

        if (!this.#rulesElement.matches("[data-role='requirements']")) {
            throw new Error(
                'Requirements element must follow field element:',
                this.#element,
            );
        }

        this.#positionRulesElement();
    }

    #positionRulesElement() {
        const formElement = document.querySelector('[data-form]');
        const formRect = formElement.getBoundingClientRect();
        const fieldRect = this.#element.getBoundingClientRect();
        this.#rulesElement.style.top = fieldRect.top - formRect.top + 'px';
        this.#rulesElement.style.left =
            fieldRect.right - formRect.left + 8 + 'px';
    }
}
