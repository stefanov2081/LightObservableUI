import NavigationHistory from "./navigation-history.js";

export default class Navigation {
    private static _lastId = 0;

    private static _construct = (() => {
        window.onpopstate = function (event) {
            Navigation.onNavigationEvent(event.state);
        };
    })();

    public static onNavigationEvent: { (navigatinHistory: NavigationHistory<any>): void };

    public static get historyState(): any {
        return history.state;
    }

    public static push<T>(navigationHistory: NavigationHistory<T>): void {
        navigationHistory.id = this._nextId();
        history.pushState(
            {
                id: navigationHistory.id,
                data: navigationHistory.data,
                url: navigationHistory.address,
                title: navigationHistory.title,
                eventName: navigationHistory.eventName,
                isRoot: false
            },
            navigationHistory.title,
            navigationHistory.address
        );
    }

    public static replaceTop(navigationHistory: NavigationHistory<any>): void {
        navigationHistory.id = this._nextId();
        history.replaceState(
            {
                id: navigationHistory.id,
                data: navigationHistory.data,
                url: navigationHistory.address,
                title: navigationHistory.title,
                eventName: navigationHistory.eventName,
                isRoot: true
            },
            navigationHistory.title,
            navigationHistory.address,
        )
    }

    private static _nextId(): number {
        return ++this._lastId;
    }
}
