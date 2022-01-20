import ViewModel from "../view-models/view-model.js";

export default class ViewModelPropertyNamePair {
    constructor(viewModel: ViewModel, propertyName: string) {
        this.viewModel = viewModel;
        this.propertyName = propertyName;
    }

    public viewModel: ViewModel;
    public propertyName: string;
}
