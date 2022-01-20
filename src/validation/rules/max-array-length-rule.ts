import Rule from "./rule.js";

export default class MaxArrayLengthRule extends Rule<Float32Array | Float64Array | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | []> {
    private _maxLength: number;

    constructor(validationMessage: string, maxLength: number) {
        super(validationMessage);

        this._maxLength = maxLength;
    }

    check(value: Float32Array | Float64Array | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | []): boolean {
        if (value && value.length > this._maxLength) {
            return false;
        }

        return true;
    }
}
