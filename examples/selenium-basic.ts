import http, { type ClientRequest } from 'node:http';
import { Builder } from 'selenium-webdriver';
import Browserbase from 'browserbase/index';

// Configuration
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;
const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

async function runSeleniumSession() {
  try {
    // Create a new session
    console.log('Creating a new session...');
    const session = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
    });
    console.log(`Session created with ID: ${session.id}`);

    // Configure HTTP agent for Selenium
    const customHttpAgent = new http.Agent({});
    // @ts-expect-error -- accessing private method
    customHttpAgent.addRequest = (req: ClientRequest, options: unknown) => {
      req.setHeader('session-id', session.id);
      req.setHeader('x-bb-api-key', BROWSERBASE_API_KEY);
      // @ts-expect-error -- accessing private method
      (http.Agent.prototype.addRequest as (...args: any[]) => unknown).call(customHttpAgent, req, options);
    };

    // Configure Selenium WebDriver
    console.log('Connecting to browser...');
    const seleniumRemoteUrl = session.seleniumRemoteUrl;

    const driver = new Builder()
      .forBrowser('chrome')
      .usingHttpAgent(customHttpAgent)
      .usingServer(seleniumRemoteUrl)
      .build();

    // Navigate to a website
    console.log('Navigating to Hacker News...');
    await driver.get('https://news.ycombinator.com/');
    const pageTitle = await driver.getTitle();
    console.log('Page title:', pageTitle);

    // Test with Selenium Remote URL
    console.log('\nTesting with Selenium Remote URL...');
    const customHttpAgentWithSigningKey = new http.Agent({});
    // @ts-expect-error -- accessing private method
    customHttpAgentWithSigningKey.addRequest = (req: ClientRequest, options: unknown) => {
      req.setHeader('x-bb-signing-key', session.signingKey);
      // @ts-expect-error -- accessing private method
      (http.Agent.prototype.addRequest as (...args: any[]) => unknown).call(
        customHttpAgentWithSigningKey,
        req,
        options,
      );
    };

    const seleniumDriver = new Builder()
      .forBrowser('chrome')
      .usingHttpAgent(customHttpAgentWithSigningKey)
      .usingServer(session.seleniumRemoteUrl)
      .build();

    await seleniumDriver.get('https://news.ycombinator.com/');
    const seleniumPageTitle = await seleniumDriver.getTitle();
    console.log('Page title (Selenium Remote URL):', seleniumPageTitle);

    // Cleanup
    await driver.quit();
    await seleniumDriver.quit();

    console.log('Session completed successfully!');
    console.log(`View session replay at https://browserbase.com/sessions/${session.id}`);
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Run the script
runSeleniumSession();
