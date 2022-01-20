import DataBinder from "../binding/data-binder.js";
import ViewModel from "../view-models/view-model.js";

export default abstract class Page extends HTMLElement {
    protected isInitialized: boolean;

    private _dataBinder: DataBinder;

    constructor() {
        super();

        this.isInitialized = false;
    }

    protected abstract renderView(): HTMLElement;

    protected initialize(): void {
        const view = this.renderView();
        this.appendChild(view);

        this.isInitialized = true;
    }

    protected setBindingContext(viewModel: ViewModel) {
        this._dataBinder = new DataBinder();
        let elements = this.querySelectorAll('[' + DataBinder.dataBindAttributeName + ']');

        for (let element of elements) {
            this._dataBinder.bind(element, viewModel);
        }
    }
}
