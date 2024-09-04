import { Given, When, Then } from '@wdio/cucumber-framework';
import StepUtils from '../../framework/utils/stepUtils';
import browser from '../../framework/browser';
import { assert } from 'chai';



Given(/^I go on the '(.*)' page$/, async function (pageName) {
    const page = StepUtils.getPageByPageName(pageName);
    await browser.getBrowser().url(page.url);
});

Then(/^I am on the '(.*)' page$/, async function (pageName) {
    const page = StepUtils.getPageByPageName(pageName);
    const isDisplayed = await page.isPageOpened();
    assert.isTrue(isDisplayed, 'Page is not opened');
})

When(/^I login with '(.*)' and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining(message));
});

