export default class Field {
    #element;
    #validators = new Set();

    constructor(element) {
        this.#element = element;
    }

    get element() {
        return this.#element;
    }

    addValidator(validator) {
        this.#validators.add(validator);
    }
}
