import Rule from "./rules/rule.js";

export default class ValidatableObject<T> {
    private _value: T;
    private _validationRules: Rule<T>[];

    constructor(value: T) {
        this._validationRules = [];
        this.value = value;

        this.valueChangedEventHandlers = [];
        this.valueIsValidEventHandlers = [];
        this.valueIsInvalidEventHandlers = [];
    }

    valueChangedEventHandlers: (() => void)[];
    valueIsValidEventHandlers: (() => void)[];
    valueIsInvalidEventHandlers: (() => void)[];

    errors: string[];

    get value(): T {
        return this._value;
    };

    set value(value: T) {
        if (this._value != value) {
            this._value = value;
            this.validate();

            for (let valueChangedEventHandler of this.valueChangedEventHandlers)
            {
                valueChangedEventHandler();
            }

            if (this.isValid) {
                for (let valueIsValidEventHandler of this.valueIsValidEventHandlers)
                {
                    valueIsValidEventHandler();
                }
            } else {
                for (let valueIsInvalidEventHandler of this.valueIsInvalidEventHandlers) {
                    valueIsInvalidEventHandler();
                }
            }
        }
    }

    get isValid(): boolean {
        return this.errors.length == 0;
    }

    addValidationRule(validationRule: Rule<T>): void {
        this._validationRules.push(validationRule);
    }

    validate(): boolean {
        this.errors = this._validationRules.filter(v => !v.check(this.value)).map(v => v.validationMessage);

        return this.isValid;
    }
}
