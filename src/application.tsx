import StringExtension from "./utilities/string-extension.js";
import Page from "./pages/page.js";
import JsxFactory from "./templating/jsx-factory.js";

export default abstract class Application {
    private readonly defaultApplicationName = 'loui-application';
    private applicationName: string;

    protected mainPage: Page;

    constructor();
    constructor(applicationName: string);
    constructor(applicationName?: string) {
        this.applicationName = applicationName ?? this.defaultApplicationName;

        this.registerViews();
    }

    appendTo(htmlElement: HTMLElement): void {
        htmlElement.appendChild(
            <div id={this.applicationName}>
                {this.mainPage}
            </div>
        );
    }

    protected abstract get contentViews(): CustomElementConstructor[];
    protected abstract get pages(): CustomElementConstructor[];

    protected async preloadImagesAsync(...imagePaths: string[]): Promise<void> {
        return new Promise((resolve) => {
            for (let imagePath of imagePaths) {
                let img = new Image();
                img.src = imagePath;
            }

            resolve();
        });
    }

    private registerViews() {
        for (let contentView of this.contentViews) {
            customElements.define(
                StringExtension.toKebabCase(contentView.name),
                contentView
            );
        }

        for (let page of this.pages) {
            customElements.define(
                StringExtension.toKebabCase(page.name),
                page
            );
        }
    }
}
