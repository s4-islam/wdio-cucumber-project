import { BASE_URL } from '../configs/environment/baseURL';

import BasePage from '../framework/basePage/index';
import Element from '../framework/baseElement';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends BasePage {
    constructor() {
        super (BASE_URL + 'login', 'Login Page');
        this.inputUsername = new Element('//input[@id="username"]', 'Username input');
        this.inputPassword = new Element('//input[@id="password"]', 'Password input');
        this.btnSubmit = new Element('//button[@type="submit and contains(., "Login")]', 'Login button');
    }
    async enterUsername (value) {
        return this.inputUsername.manualClearValueAndType(value);
    }

    async enterPassword (value) {
        return this.inputPassword.clearAndTypeSecret(value);
    }

    async clickLogin () {
        return this.btnSubmit.click();
    }
}

export default new LoginPage();
