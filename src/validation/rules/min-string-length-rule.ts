import Rule from "./rule.js";

export default class MinStringLengthRule extends Rule<string> {
    private _minLenght: number;

    constructor(validationMessage: string, minLength: number) {
        super(validationMessage);

        this._minLenght = minLength;
    }

    check(value: string): boolean {
        if (value.length < this._minLenght) {
            return false;
        }

        return true;
    }
}
