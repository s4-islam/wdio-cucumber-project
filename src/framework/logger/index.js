import { default as AllureReporter } from "@wdio/allure-reporter";

let logBuffer = [];

export default class Logger {
    static info(message) {
        const msg = `[INFO] ${new Date().toLocaleTimeString()} : ${message}`;
        console.log(msg);
        logBuffer.push(msg)
    }

    static error(message) {
        const msg = `[INFO] ${new Date().toLocaleTimeString()} : ${message}`;
        console.log(msg);
        logBuffer.push(msg)
        throw new Error(msg);
    }

    static flush() {
        AllureReporter.addAttachment('info', logBuffer.join('\n'));
        logBuffer = [];
    }
}