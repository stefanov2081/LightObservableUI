import Rule from "./rule.js";

export default class RequiredRule<T> extends Rule<T>{
    check(value: T): boolean {
        if (value == null) {

            return false;
        }

        return true;
    }
}
