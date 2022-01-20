import ObjectKeyPair from "./object-key-pair.js";

export default class ObjectExtension {
    static getNestedValue(object: any, path: string): any {
        let result = object;
        let keys = path.split('.');

        for (let key of keys) {
            result = result[key];
        }

        return result;
    }

    static getNestedValueOrDefault(object: any, path: string, defaultValue: any): any {
        return ObjectExtension.getNestedValue(object, path) ?? defaultValue;
    }

    static getPenultimateNestedObject(object: any, path: string): any {
        let result = object;
        let keys = path.split('.');

        for (let i = 0; i < keys.length - 1; i++) {
            result = result[keys[i]];
        }

        return result;
    }

    static getPenultimateNestedObjectOrDefault(object: any, path: string, defaultValue: any): any {
        return ObjectExtension.getPenultimateNestedObject(object, path) ?? defaultValue;
    }

    static getPenultimateNestedObjectAndLastKey(object: any, path: string): ObjectKeyPair {
        let result = object;
        let keys = path.split('.');

        for (let i = 0; i < keys.length - 1; i++) {
            result = result[keys[i]];
        }

        return new ObjectKeyPair(result, keys[keys.length - 1]);
    }
    
    static getPenultimateNestedObjectOrDefaultAndLastKey(object: any, path: string, defaultValue: any): ObjectKeyPair {
        let result = ObjectExtension.getPenultimateNestedObjectAndLastKey(object, path);

        if (result.object == null) {
            result.object = defaultValue;
        }

        return result;
    }
}
