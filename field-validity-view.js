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
    }
}
