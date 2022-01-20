export default class ImageExtension {
    static uint8ArrayToDataUrl(image: Uint8Array): string {
        return 'data:image/png;base64, ' + this.uint8ArrayToBase64String(image);
    }

    static uint8ArrayToBase64String(image: Uint8Array): string {
        return btoa(
            image.reduce((data, byte) =>
                data + String.fromCharCode(byte),
                ''
            )
        );
    }

    static base64StringToUint8Array(base64String: string): Uint8Array {
        return Uint8Array.from(
            atob(base64String),
            c => c.charCodeAt(0)
        );
    }
}
