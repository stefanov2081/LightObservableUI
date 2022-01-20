export default class HttpRequestException extends DOMException {
    private _statusCode: number;

    constructor();
    constructor(statusCode: number)
    constructor(statusCode: number, message: string)
    constructor(statusCode?: number, message?: string) {
        message = message || 'An HTTP request error occured.';

        super(message, 'HttpRequestException');

        this._statusCode = statusCode;
    }

    get statusCode(): number {
        return this._statusCode;
    }
}
