export default class MessagingCenter {
    static subscribers: any = {};

    static send(sender: any, message: any, ...args: any): void {
        if (this.subscribers[sender.constructor.name] && this.subscribers[sender.constructor.name][message]) {
            for (let subscriber of Object.keys(this.subscribers[sender.constructor.name][message]).map(e => this.subscribers[sender.constructor.name][message][e])) {
                for (let messageHandler of subscriber) {
                    messageHandler.callback.call(messageHandler.obj, ...args);
                }
            }
        }
    }

    static subscribe(sender: any, subscriber: any, message: any, callback: any): void {
        let senderName = sender.prototype.constructor.name || sender.constructor.name;

        if (this.subscribers[senderName] == null) {
            this.subscribers[senderName] = {};
            this.subscribers[senderName][message] = {};
            this.subscribers[senderName][message][subscriber.constructor.name] = [];
        } else if (this.subscribers[senderName][message] == null) {
            this.subscribers[senderName][message] = {};
            this.subscribers[senderName][message][subscriber.constructor.name] = [];
        } else if (this.subscribers[senderName][message][subscriber.constructor.name] == null) {
            this.subscribers[senderName][message][subscriber.constructor.name] = [];
        }

        if (this.subscribers[senderName][message][subscriber.constructor.name].filter((x: any) => x.callback == callback && x.obj == subscriber).length == 0) {
            this.subscribers[senderName][message][subscriber.constructor.name].push({ obj: subscriber, callback: callback });
        }
    }

    static unsubscribe(sender: any, subscriber: any, message: any): void {
        if (this.subscribers[sender][message][subscriber.constructor.name]) {
            this.subscribers[sender][message][subscriber.constructor.name] = null;
        }
    }
}
