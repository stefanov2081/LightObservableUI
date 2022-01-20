import Rule from "./rule.js";

export default class NotWhiteSpaceRule extends Rule<string> {
    check(value: string): boolean {
        // Here is an explanation of the regular expression.
        // ^ - Beginning. Matches the beginning of the string, or the beginning of a line if the multiline flag (m) is enabled. This matches a position, not a character.
        // \s - Whitespace. Matches any whitespace character (spaces, tabs, line breaks).
        // + - Quatifier. Matches 1 or more of the preceding token..
        // $ - End. Matches the end of the string, or the end of a line if the multiline flag (m) is enabled. This matches a position, not a character.
        if (value.match(/^\s+$/)) {
            return false;
        }

        return true;
    }
}
