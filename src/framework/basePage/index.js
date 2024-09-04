import Element from "../baseElement";

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class BasePage {
    constructor(url, name) {
        this.name = name;
        this.url = url;
        this.pageElement = new Element('//body', 'Body element');
    }
     /**
     * Get page is opened
     * @returns {boolean} state displayed of the page
     */
    async isPageOpened () {
        return this.pageElement._get$().isDisplayed();
    }

   /**
   * Get name of the page
   * @returns {string} Name of the page
   */
    getPageName() {
        return this.name;
    }

    /**
     * Get url of the page
     * @returns {string} Url of the page
     */
    getPageUrl() {
        return this.url;
    }
}
