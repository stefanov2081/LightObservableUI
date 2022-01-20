export default class StringExtension {
    public static toKebabCase(text: string): string {
        let result = text[0].toLowerCase();

        for (var i = 1; i < text.length; i++) {
            let currentChar = text[i];

            if (/[A-Z]/.test(currentChar)) {
                result += '-';
                currentChar = currentChar.toLowerCase();
            }

            result += currentChar;
        }

        return result;
    }

    public static kebabToPascalCase(text: string): string {
        let pascalizedText = text[0];

        for (var i = 1; i < text.length; i++) {
            let currentChar = text[i];

            if (currentChar == '-') {
                i++;
                currentChar = text[i].toUpperCase();
            }

            pascalizedText += currentChar;
        }

        return pascalizedText;
    }
}
