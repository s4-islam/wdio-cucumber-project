import { Before, After, BeforeStep, AfterStep, AfterAll } from '@cucumber/cucumber';
import Logger from '../framework/logger';
import { default as allure } from "@wdio/allure-reporter";

let scenarioResults = [];
let startTime;

// Log the start of the test run
Before(() => {
    if (!startTime) {
        startTime = Date.now();
    }
});

BeforeStep((step) => {
    Logger.info(`Starting Step: ${step.pickleStep.text}`);
});

AfterStep((step) => {
    Logger.info(`Finished Step: ${step.pickleStep.text}`);
    Logger.info(`Status: ${step.result.status}`);
});

// Log each scenario's result
After((scenario) => {
    const scenarioDetail = {
        name: scenario.pickle.name,
        status: scenario.result.status,
        steps: scenario.pickle.steps.map((step, index) => ({
            text: step.text,
            status: scenario.steps[index]?.result.status,
            duration: scenario.steps[index]?.result.duration,
        }))
    };

    scenarioResults.push(scenarioDetail);

    Logger.info(`Finished Scenario: ${scenario.pickle.name}`);
    Logger.info(`Status: ${scenario.result.status}`);
});

// Add a comprehensive summary in the AfterAll hook
AfterAll(() => {
    const endTime = Date.now();
    const totalDuration = (endTime - startTime) / 1000; // Duration in seconds
    const passedScenarios = scenarioResults.filter(scenario => scenario.status === 'passed').length;
    const failedScenarios = scenarioResults.filter(scenario => scenario.status === 'failed').length;

    Logger.info('All Scenarios have finished.');
    Logger.info(`Total Scenarios: ${scenarioResults.length}`);
    Logger.info(`Passed: ${passedScenarios}`);
    Logger.info(`Failed: ${failedScenarios}`);
    Logger.info(`Total Duration: ${totalDuration} seconds`);

    // Add summary to Allure report
    allure.addAttachment('Execution Summary', `
        Total Scenarios: ${scenarioResults.length}
        Passed: ${passedScenarios}
        Failed: ${failedScenarios}
        Total Duration: ${totalDuration} seconds
    `, 'text/plain');

    // Attach detailed scenario results including steps
    allure.addAttachment('Detailed Scenario Results', JSON.stringify(scenarioResults, null, 2), 'application/json');
});

export { Before, After, BeforeStep, AfterStep, AfterAll };
