import { BASE_URL } from "../configs/environment/baseURL";

import BasePage from "../framework/basePage";
import Element from "../framework/baseElement";


/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends BasePage {
    constructor() {
        super(BASE_URL + 'secure')
        this.flashAlert = new Element('//div[@id="flash"]', 'Flash alert')
    }

    async isflashAlertDisplayed () {
        return this.flashAlert._get$().isDisplayed();
    }
}

export default new SecurePage();
