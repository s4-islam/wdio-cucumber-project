import browser from "../browser";
import Logger from "../logger";
import timeouts from "../../configs/environment/timeouts";
import { Keys } from "../../constants/keys";

const maskedValue = '********';

export default class Element {
    constructor(locator, name) {
        this.locator = locator;
        this.name = name;
    }

    _get$() {
        let selector;
        if (typeof this.locator === 'string' || typeof this.locator === 'function') {
          selector = $(this.locator);
        } else {
          selector = this.locator;
        }
        return selector;
    }

    /**
   * Click on element
   * @param {object} options Options containing `quick` and `viaJS` boolean settings
   * @returns {Promise<void>}
   */
  async click() {
    Logger.info(`Click at '${this.name}'`);
    const element = await this._get$();
    await browser.waitFor(
        async () => {
          element.isClickable();
        },
        true,
        'Element is clickable',
      );
    return element.click();
  }

  /**
   * Get text from element
   * @returns {Promise<string>} Text from element
   */
  async getText() {
    Logger.info(`Get text from element "${this.name}"`);
    const element = await this._get$();
    await browser.waitFor(
        async () => {
          element.isExisting();
        },
        true,
        'Element is existing',
      );
    const text = await element.getText();
    Logger.info(`Received text "${text}"`);
    return text;
  }

  /**
   * Get text from elements
   * @returns {Promise<Array<string>>} Text from elements
   */
  async getTextFromElements() {
    Logger.info(`Get text from elements "${this.name}"`);
    const elements = await $$(this.locator);

    const texts = [];
    for (const el of elements) {
      if (!(await el.isDisplayedInViewport())) {
        await el.scrollIntoView();
      }
      const text = await el.getText();
      Logger.info(`Received text "${text}"`);
      texts.push(text);
    }
    return texts;
  }

  /**
   * Scroll element into view
   * @param {object} scrollIntoViewOptions Options for `scrollIntoView` method from webdriverIO
   * @returns
   */
  async scrollIntoView(scrollIntoViewOptions = { block: 'center' }) {
    Logger.info(`Scroll to element ${this.name}`);
    const element = await this._get$();
    await browser.waitFor(
        async () => {
          element.isExisting();
        },
        true,
        'Element is existing',
      );
    return element.scrollIntoView(scrollIntoViewOptions);
  }

  /**
   * Type text into element
   * @param {string} value Text to type
   * @param {object} options Options containing `secret` and `clear` boolean settings, cutoffValue number setting
   * @returns {Promise<void>}
   */
  async type(value, options = { secret: false, clear: false, cutoffValue: null }) {
    Logger.info(`Type text "${options.secret ? maskedValue : value}" in "${this.name}"`);
    options.secret = options.secret || false;
    options.clear = options.interval || false;
    options.cutoffValue = options.cutoffValue || null;
    if (options.clear || (await this.getValue() != '')) {
      await this.manuallyClearValue();
    }
    await this.setValue(value);
    if (options.cutoffValue) {
      value = value.slice(0, options.cutoffValue);
    }
    await browser.waitFor(
      async () => {
        const actualValue = await this.getValue();
        return actualValue == value;
      },
      true,
      'Text is typed correctly',
    );
  }

  async manuallyClearValue() {
    Logger.info(`Manually clear value from element "${this.name}"`);
    const keys = [Keys.CONTROL, Keys.LITTLE_A, Keys.DELETE];
    const element = await this._get$();
    await element.click();
    return browser.getBrowser().keys([...keys]);
  }

  /**
   * Type text hiding value in log
   * @param {string} value Text to type
   * @returns {Promise<void>}
   */
  async typeSecret(value) {
    return this.type(value, { secret: true, clear: false });
  }

  /**
   * Clear text and then type
   * @param {string} value Text to type
   * @returns {Promise<void>}
   */
  async clearAndType(value) {
    return this.type(value, { secret: false, clear: true });
  }

  /**
   * Clear text by keyboard shortcut and then type
   * @param {string} value Text to type
   * @returns {Promise<void>}
   */
  async manualClearValueAndType(value) {
    await this.manuallyClearValue();
    return this.type(value, { secret: true, clear: true });
  }

  /**
   * Clear text and then type hiding value in log
   * @param {string} value Text to type
   * @returns {Promise<void>}
   */
  async clearAndTypeSecret(value) {
    return this.type(value, { secret: true, clear: true });
  }

   /**
   * Move to element
   * @returns {Promise<void>}
   */
    async moveTo() {
        Logger.info(`Move to "${this.name}"`);
        await this.state().waitForExist({ timeout: timeouts.polling, noThrow: false });
        return (await this._get$()).moveTo();
    }
}
