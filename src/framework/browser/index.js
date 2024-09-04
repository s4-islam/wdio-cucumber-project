import timeouts from '../../configs/environment/timeouts';
import Logger from '../logger';

export default new (class Browser {

     /**
    * Get browser
    * @returns {Browser} Browser
    */
    getBrowser() {
        return browser;
    }

    /**
   * Switch to last window
   * @returns {Promise<void>}
   */
  async switchToLastWindow() {
    Logger.info('Switch to last window');
    const windows = await this.getBrowser().getWindowHandles();
    Logger.info(`Windows count: ${windows.length}`);
    return this.getBrowser().switchToWindow(windows.pop());
  }

  /**
   * Switch to first window
   * @returns {Promise<void>}
   */
  async switchToFirstWindow() {
    Logger.info('Switch to first window');
    const windows = await this.getBrowser().getWindowHandles();
    return this.getBrowser().switchToWindow(windows[0]);
  }

  /**
   * Close current window
   * @returns {Promise<void>}
   */
  async closeCurrentWindow() {
    Logger.info('Close last window');
    return this.getBrowser().closeWindow();
  }

  /**
   * Get current url with logging
   * @returns {Promise<string>} result of getUrl function
   */
  async getCurrentUrl() {
    Logger.info('Get current url');
    return this.getBrowser().getUrl();
  }

   /**
   * Wait for condition
   * @param {func} func function to wait on
   * @param {boolean} throwException should exception be thrown
   * @param {string} message message to log
   * @param {number} timeout timeout in seconds
   * @param {number} interval interval between condition checks in seconds
   * @returns {Promise<boolean>} result of waitUntil function
   */
   async waitFor(
    func,
    throwException = false,
    message = 'function complete',
    timeout = timeouts.explicit,
    interval = timeouts.interval
  ) {
    Logger.info(`Wait for ${message}`);
    try {
      await this.getBrowser().waitUntil(func, {
        timeout: timeout,
        interval: interval,
      });
      return true;
    } catch (err) {
      const logMessage = `Waiting '${message}' is not successful`;
      if (throwException) {
        Logger.error(logMessage);
      }
      Logger.info(logMessage);
      return false;
    }
  }

  /**
   * Add screenshot to the report
   * @param {number} screenName name for screen
   * @param {boolean} isWait true if need delay before making screen
   * @param {number} timer delay before making screen (ms)
   * @returns {Promise<any>} result
   */
  async addScreenshot(screenName, isWait = false, timer = timeouts.timer) {
    Logger.info(`Make screenshot ${screenName}`);
    try {
      if (isWait) {
        await this.getBrowser().pause(timer * MILLISECONDS_TO_SECONDS);
      }
      await this.getBrowser().takeScreenshot();
    } catch (err) {
      Logger.error(err);
    }
  }

  /**
   * Use this only if you can't detect an animation or loading in DOM
   * @param timeout - the timeout in ms
   */
  async waitForDelay(timeout) {
    Logger.info(`Wait for ${timeout} delay`);
    return this.getBrowser().pause(timeout || timeouts.baseDelay);
  }
})();
