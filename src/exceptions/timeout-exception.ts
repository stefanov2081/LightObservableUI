export default class TimeoutException extends DOMException {
    constructor();
    constructor(message: string)
    constructor(message?: string) {
        message = message || 'The request timed out.';

        super(message, 'TimeoutException');
    }
}
