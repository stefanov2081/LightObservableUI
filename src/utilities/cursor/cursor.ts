export default class Cursor {
    private static _currentClass: string;

    static default(): void {
        if (this._currentClass) {
            document.documentElement.classList.remove(this._currentClass);
            this._currentClass = null;
        }
    }

    static wait(): void {
        this._changeClass('wait');
    }

    static progress(): void {
        this._changeClass('progress');
    }

    private static _changeClass(newClass: string) {
        if (newClass) {
            document.documentElement.classList.remove(this._currentClass);
            document.documentElement.classList.add(newClass);
            this._currentClass = newClass;
        }
    }
}
