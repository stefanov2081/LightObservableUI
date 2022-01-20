export default abstract class Rule<T> {

    constructor(validationMessage: string) {
        this.validationMessage = validationMessage;
    }

    validationMessage: string;

    abstract check(value: T): boolean;
}
