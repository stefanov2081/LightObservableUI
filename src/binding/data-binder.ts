import ObjectExtension from "../utilities/object-extension.js";
import StringExtension from "../utilities/string-extension.js";
import ViewModel from "../view-models/view-model.js";
import { BindingMode } from "./binding-mode.js";
import BindingPropertyNamePair from "./binding-property-name-pair.js";
import ElementPropertyNamePair from "./element-property-name-pair.js";
import ViewModelPropertyNamePair from "./view-model-property-name-pair.js";

export default class DataBinder {
    public static dataBindAttributeName = 'data-bind';
    public static dataBindingModeAttributeName = 'data-binding-mode';

    private _viewModelSubjectToObserverMappings = new Map<ViewModel, Map<string, ElementPropertyNamePair[]>>();
    private _elementSubjectToObserverMappings = new Map<Element, Map<string, ViewModelPropertyNamePair[]>>();

    public bind(element: Element, viewModel: ViewModel) {
        let bindingMode = this._getBindingMode(element);

        switch (bindingMode) {
            case BindingMode.OneWay:
                this.bindViewModelToElement(viewModel, element, bindingMode);
                break;
            case BindingMode.OneWayToSource:
                this.bindElementToViewModel(element, viewModel, bindingMode);
                break;
            case BindingMode.TwoWay:
            default:
                this.bindViewModelToElement(viewModel, element, bindingMode);
                this.bindElementToViewModel(element, viewModel, bindingMode);
        }
    }

    private bindViewModelToElement(subject: ViewModel, observer: Element, bindingMode: BindingMode): void {
        let bindingPropertyNamePairs = this._getOneWayBindingPropertyPairs(observer);

        if (this._viewModelSubjectToObserverMappings.has(subject) == false) {
            this._viewModelSubjectToObserverMappings.set(subject, new Map<string, ElementPropertyNamePair[]>());
        }

        for (let bindingPropertyNamePair of bindingPropertyNamePairs) {
            let subjectMappings = this._viewModelSubjectToObserverMappings.get(subject);

            if (subjectMappings.has(bindingPropertyNamePair.subjectPropertyName) == false) {
                subjectMappings.set(bindingPropertyNamePair.subjectPropertyName, []);
            }

            subjectMappings
                .get(bindingPropertyNamePair.subjectPropertyName)
                .push(
                    new ElementPropertyNamePair(
                        observer,
                        bindingPropertyNamePair.observerPropertyName
                    )
                );

            let subjectValue = ObjectExtension.getNestedValue(subject, bindingPropertyNamePair.subjectPropertyName);

            if (bindingMode == BindingMode.TwoWay) {
                if (subjectValue) {
                    (observer as any)[bindingPropertyNamePair.observerPropertyName] = subjectValue;
                }
            } else {
                (observer as any)[bindingPropertyNamePair.observerPropertyName] = subjectValue;
            }

            let thisDataBinder = this;

            subject.propertyChangedEventHandler = function (subject, subjectPropertyName) {
                thisDataBinder._onViewModelPropertyChanged(subject, subjectPropertyName);
            };
        }
    }

    private bindElementToViewModel(subject: Element, observer: ViewModel, bindingMode: BindingMode): void {
        let bindingPropertyNamePairs = this._getOneWayToSourceBindingPropertyPairs(subject);

        if (this._elementSubjectToObserverMappings.has(subject) == false) {
            this._elementSubjectToObserverMappings.set(subject, new Map<string, ViewModelPropertyNamePair[]>());
        }

        for (let bindingPropertyNamePair of bindingPropertyNamePairs) {
            let subjectMappings = this._elementSubjectToObserverMappings.get(subject);

            if (subjectMappings.has(bindingPropertyNamePair.subjectPropertyName) == false) {
                subjectMappings.set(bindingPropertyNamePair.subjectPropertyName, []);

                let thisDataBinder = this;

                subject.addEventListener('input', function (event) {
                    thisDataBinder._onElementPropertyChanged(this, bindingPropertyNamePair.subjectPropertyName);
                });
            }

            subjectMappings
                .get(bindingPropertyNamePair.subjectPropertyName)
                .push(
                    new ViewModelPropertyNamePair(
                        observer,
                        bindingPropertyNamePair.observerPropertyName
                    )
                );

            let observerObjectAndKey = ObjectExtension.getPenultimateNestedObjectOrDefaultAndLastKey(
                observer,
                bindingPropertyNamePair.observerPropertyName,
                observer
            );

            let subjectValue = ObjectExtension.getNestedValue(subject, bindingPropertyNamePair.subjectPropertyName);

            if (bindingMode == BindingMode.TwoWay) {
                if (subjectValue) {
                    observerObjectAndKey.object[observerObjectAndKey.key] = subjectValue;
                }
            } else {
                observerObjectAndKey.object[observerObjectAndKey.key] = subjectValue;
            }
        }
    }

    private _getBindingMode(element: Element): BindingMode {
        let bindingMode: BindingMode = BindingMode.OneWay;

        for (var i = 0; i < element.attributes.length; i++) {
            if (element.attributes[i].name == DataBinder.dataBindingModeAttributeName) {
                bindingMode = element.attributes[i].value as BindingMode;
            }
        }

        return bindingMode;
    }

    private _getOneWayBindingPropertyPairs(element: Element): BindingPropertyNamePair[] {
        let bindingPropertyPairs: BindingPropertyNamePair[] = [];

        for (var i = 0; i < element.attributes.length; i++) {
            let currentAttribute = element.attributes[i];

            if (currentAttribute.name != DataBinder.dataBindAttributeName &&
                currentAttribute.name != DataBinder.dataBindingModeAttributeName &&
                currentAttribute.name.substr(0, 9) == DataBinder.dataBindAttributeName) {
                bindingPropertyPairs.push(
                    new BindingPropertyNamePair(
                        currentAttribute.value,
                        this._getTargetPropertyName(currentAttribute)
                    )
                );
            }
        }

        return bindingPropertyPairs;
    }

    private _getOneWayToSourceBindingPropertyPairs(element: Element): BindingPropertyNamePair[] {
        let bindingPropertyPairs: BindingPropertyNamePair[] = [];

        for (var i = 0; i < element.attributes.length; i++) {
            let currentAttribute = element.attributes[i];

            if (currentAttribute.name != DataBinder.dataBindAttributeName &&
                currentAttribute.name != DataBinder.dataBindingModeAttributeName &&
                currentAttribute.name.substr(0, 9) == DataBinder.dataBindAttributeName) {
                bindingPropertyPairs.push(
                    new BindingPropertyNamePair(
                        this._getTargetPropertyName(currentAttribute),
                        currentAttribute.value
                    )
                );
            }
        }

        return bindingPropertyPairs;
    }

    private _getTargetPropertyName(attribute: Attr): string {
        return StringExtension.kebabToPascalCase(
            attribute.name.substr(
                DataBinder.dataBindAttributeName.length + 1,
                (attribute.name.length - 1) - DataBinder.dataBindAttributeName.length
            )
        );
    }

    private _onViewModelPropertyChanged(subject: ViewModel, subjectPropertyName: string) {
        if (this._viewModelSubjectToObserverMappings.has(subject) && this._viewModelSubjectToObserverMappings.get(subject).has(subjectPropertyName)) {
            for (let elementProprtyNamePair of this._viewModelSubjectToObserverMappings.get(subject).get(subjectPropertyName)) {

                const subjectValue = ObjectExtension.getNestedValue(subject, subjectPropertyName);

                (elementProprtyNamePair.element as any)[elementProprtyNamePair.propertyName] = subjectValue;
            }
        }
    }

    private _onElementPropertyChanged(subject: Element, subjectPropertyName: string = 'value') {
        if (this._elementSubjectToObserverMappings.has(subject) && this._elementSubjectToObserverMappings.get(subject).has(subjectPropertyName)) {
            for (let viewModelPropertyNamePair of this._elementSubjectToObserverMappings.get(subject).get(subjectPropertyName)) {

                const observerObjectAndKey = ObjectExtension.getPenultimateNestedObjectOrDefaultAndLastKey(
                    viewModelPropertyNamePair.viewModel,
                    viewModelPropertyNamePair.propertyName,
                    viewModelPropertyNamePair.viewModel
                );

                observerObjectAndKey.object[observerObjectAndKey.key] = (subject as any)[subjectPropertyName];
            }
        }
    }
}
