export default class NavigationHistory<T> {
    constructor(data: T, eventName: string) {
        this.data = data;
        this.eventName = eventName;
        this.timestamp = Date.now();
    }

    public id: number;
    public data: T;
    public address: string;
    public title: string;
    public eventName: string;
    public isRoot: boolean;
    public timestamp: number;
}
