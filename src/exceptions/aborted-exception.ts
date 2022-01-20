export default class AbortedException extends DOMException {
    constructor();
    constructor(message: string)
    constructor(message?: string) {
        message = message || 'The operation was aborted.';

        super(message, 'AbortedException');
    }
}
