import AbortedException from "../../exceptions/aborted-exception.js";
import HttpRequestException from "../../exceptions/http-request-exception.js";
import TimeoutException from "../../exceptions/timeout-exception.js";
import { HttpMethod } from "./http-method.js";
import HttpReponse from "./http-response.js";

export default class HttpClient {
    constructor() {
        this.timeoutMilliseconds = 100000;
    }

    timeoutMilliseconds: number;

    async getAsync(url: string, abortController?: AbortController): Promise<HttpReponse> {
        return this._sendAsync(url, HttpMethod.Get, null, abortController);
    }

    async deleteAsync(url: string, body: any): Promise<HttpReponse> {
        return this._sendAsync(url, HttpMethod.Delete, body);
    }

    async postAsync(url: string, body: any, abortController?: AbortController): Promise<HttpReponse> {
        return this._sendAsync(url, HttpMethod.Post, body, abortController);
    }

    async putAsync(url: string, body: any): Promise<HttpReponse> {
        return this._sendAsync(url, HttpMethod.Put, body);
    }

    private _sendAsync(url: string, httpMethod: HttpMethod, body?: any, abortController?: AbortController): Promise<HttpReponse> {
        return new Promise(async (resolve, reject) => {
            let hasRequestTimeouted = false;
            abortController = abortController || new AbortController();

            const timeout = setTimeout(function () {
                hasRequestTimeouted = true;
                abortController.abort();
            }, this.timeoutMilliseconds);

            // TODO: Expose the headers as an argument.
            let headers = new Headers();
            headers.set('Content-Type', 'application/json');

            try {
                const response = await fetch(
                    url,
                    {
                        body: body ? JSON.stringify(body) : null,
                        headers: headers,
                        method: httpMethod,
                        signal: abortController.signal
                    }
                );

                const responseText = await response.text();

                clearTimeout(timeout);

                resolve(new HttpReponse(responseText, response.status));
            }
            catch (error) {
                if (abortController.signal.aborted) {
                    if (hasRequestTimeouted) {
                        reject(new TimeoutException());
                    } else {
                        reject(new AbortedException());
                    }
                } else {
                    clearTimeout(timeout);

                    reject(new HttpRequestException());
                }
            }
        });
    }
}
