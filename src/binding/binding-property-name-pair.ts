export default class BindingPropertyNamePair {
    constructor(subjectPropertyName: string, observerPropertyName: string) {
        this.subjectPropertyName = subjectPropertyName;
        this.observerPropertyName = observerPropertyName;
    }

    public subjectPropertyName: string;
    public observerPropertyName: string;
}
