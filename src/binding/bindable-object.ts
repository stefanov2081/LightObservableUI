import ObjectExtension from "../utilities/object-extension.js";

export default class BindableObject {
    public propertyChangedEventHandler: (sender: any, propertyName: string) => void;

    protected setProperty(backingFieldName: string, value: any, propertyName: string) {
        let objectAndKey = ObjectExtension.getPenultimateNestedObjectOrDefaultAndLastKey(this, backingFieldName, this);

        if (objectAndKey.object[objectAndKey.key] == value) {
            return false;
        }

        objectAndKey.object[objectAndKey.key] = value;

        if (this.propertyChangedEventHandler) {
            this.propertyChangedEventHandler(this, propertyName);
        }

        return true;
    }
}
