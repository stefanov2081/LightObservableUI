import Rule from "./rule.js";

export default class NotEmptyRule extends Rule<string> {
    check(value: string): boolean {
        if (value == '') {
            return false;
        }

        return true;
    }
}
