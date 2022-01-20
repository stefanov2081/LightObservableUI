export default class JsxFactory {
    static dataBindAttributeName = 'data-bind';

    static nonNull(val: any, fallback: any): any {
        return Boolean(val) ? val : fallback
    };

    static DOMparseChildren(children: any) {
        return children.map((child: any) => {
            if (typeof child === 'string') {
                return document.createTextNode(child);
            }

            return child;
        })
    }

    static DOMparseNode(element: any, properties: any, children: any[]) {
        const el = document.createElement(element);
        let isDataBindAttributeAppended = false;

        Object.keys(this.nonNull(properties, {}))
            .forEach(key => {
                if (key.substring(0, 4) == 'data') {
                    let keyToKebabCase = this.toKebabCase(key);

                    if (isDataBindAttributeAppended == false) {
                        el.setAttribute(this.dataBindAttributeName, true);
                        isDataBindAttributeAppended = true;
                    }

                    if (keyToKebabCase != this.dataBindAttributeName) {
                        el.setAttribute(keyToKebabCase, properties[key]);
                    }
                } else {
                    el[key] = properties[key];
                }
        });

        this.DOMparseChildren(children).forEach((child: any) => {
            el.appendChild(child);
        });

        return el;
    }

    static DOMcreateElement(element: (arg0: any) => any, properties: any, ...children: any[]) {
        if (typeof element === 'function') {
            return element({
                ...this.nonNull(properties, {}),
                children
            });
        }

        return this.DOMparseNode(element, properties, children);
    }

    private static toKebabCase(text: string): string {
        let kebabptizedText = text[0].toLowerCase();

        for (var i = 1; i < text.length; i++) {
            let currentChar = text[i];

            if (/[A-Z]/.test(currentChar)) {
                kebabptizedText += '-';
                currentChar = currentChar.toLowerCase();
            }

            kebabptizedText += currentChar;
        }

        return kebabptizedText;
    }
}
