import loginPage from "../../pages/loginPage";
import securePage from "../../pages/secure.page";
import Logger from "../logger";

export default class StepUtils {
    static getPageByPageName(pageName) {
        switch (pageName) {
            case "Login":
                return loginPage;
            case "Secure":
                return securePage;
            default:
                Logger.error('Invalid page name');
                break;
        }
    }
}