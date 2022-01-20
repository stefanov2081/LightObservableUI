import Rule from "./rule.js";

export default class MaxStringLengthRule extends Rule<string> {
    private _maxLenght: number;

    constructor(validationMessage: string, maxLength: number) {
        super(validationMessage);

        this._maxLenght = maxLength;
    }

    check(value: string): boolean {
        if (value.length > this._maxLenght) {
            return false;
        }

        return true;
    }
}
