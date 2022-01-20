# Light Observable UI
**Light Observable UI** is a lightweight [MVVM](http://en.wikipedia.org/wiki/Model_View_ViewModel) library, written in TypeScript, that eases the development of modern single page applications with TypeScript and HTML. It has declarative bindings to automatically sync the UI with the model. It supports templating with JSX, which makes binding between view and a view model a breeze.

## Getting started
Using Light Observable UI is very easy. Here are the steps to start using it:
* Download the library and add it to your project.
* Link the DemoApp class in your html file

	**index.html**
	```xml
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8" />
	</head>
	<body>
		<script src="js/demo-app/demo-app.js" type="module"></script>
	</body>
	</html>
	```
* Create a DemoApp class that extends Application

	**demo-app/demo-app.js**
	```javascript
	import Application from "../lib/lightweight-observable-ui/application.js";
	import MainPage from "./pages/main-page.js";
	
	export default class DemoApp extends Application {
		constructor() {
			super();
	
			this.mainPage = new MainPage();
		}
	
		protected get contentViews(): CustomElementConstructor[] {
			return [];
		}
	
		protected get pages(): CustomElementConstructor[] {
			return [MainPage];
		}
	}
	
	(function main() {
		new DemoApp().appendTo(document.body);
	}());
	```


* Create a MainPage class that extends Page

	**demo-app/pages/main-page.js**
	```javascript
	import { BindingMode } from "../../lib/lightweight-observable-ui/binding/binding-mode.js";
	import Page from "../../lib/lightweight-observable-ui/pages/page.js";
	import JsxFactory from "../../lib/lightweight-observable-ui/templating/jsx-factory.js";
	import MainPageViewModel from "./main-page-view-model.js";
	
	export default class MainPage extends Page {
		private _viewModel: MainPageViewModel;
	
		constructor() {
			super();
	
			this._viewModel = new MainPageViewModel();
	
			this.initialize();
			this.setBindingContext(this._viewModel);
		}
	
		protected renderView(): HTMLElement {
			return <div>
				<label>Enter text: </label>
				<input
					dataBind:value="text"
					dataBindingMode={BindingMode.OneWayToSource}
					type="text">
				</input>
				<p dataBind:textContent="text"></p>
			</div>;
		}
	}
	```
	
* Create a MainPageViewModel class that extends ViewModel

	**demo-app/pages/main-page-view-model.js**
	```javascript
	import ViewModel from "../../lib/lightweight-observable-ui/view-models/view-model.js";
	
	export default class MainPageViewModel extends ViewModel {
		private _text: string;
	
		constructor() {
			super();
		}
	
		get text(): string {
			return this._text;
		}
	
		set text(value: string) {
			this.setProperty('_text', value, 'text');
		}
	}
	```


The demo application demonstrates two important concepts. Templating and binding. In the renderView() method of MainPage you can see that the page is build declaratively using JSX. The page has a label, an input field and a paragraph. The input field and the paragraph are bound to the name property of the MainPageViewModel. When the input field changes, the paragraph will be updated. Go ahead and open index.html in your browser, and type something in the input field, and you will see the paragraph updating as you type.

## License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)