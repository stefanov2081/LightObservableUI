export default class ElementPropertyNamePair {
    constructor(element: Element, propertyName: string) {
        this.element = element;
        this.propertyName = propertyName;
    }

    public element: Element;
    public propertyName: string;
}
