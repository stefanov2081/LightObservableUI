import { HttpStatusCode } from "./http-status-code";

export default class HttpReponse {
    private _content: string;
    private _statusCode: HttpStatusCode;

    constructor(content: string, statusCode: HttpStatusCode) {
        this._content = content;
        this._statusCode = statusCode;
    }

    get content(): string {
        return this._content;
    }

    get statusCode(): HttpStatusCode {
        return this._statusCode;
    }

    get ok(): boolean {
        return this._statusCode == HttpStatusCode.Ok;
    }

    get internalServerError(): boolean {
        return this._statusCode == HttpStatusCode.InternalServerError;
    }

    contentToJson<T>(): T {
        return JSON.parse(this._content) as T;
    }
}
