import Rule from "./rule.js";

export default class UrlRule extends Rule<string>{
    check(value: string): boolean {
        if (value == null) {
            return false;
        }

        if (value.substring(0, 9) == 'javascript') {
            return false;
        }

        let url;

        try {
            url = new URL(value);
        } catch (_) {
            return false;
        }

        return true;
    }
}
