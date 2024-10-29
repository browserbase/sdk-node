import { connect } from 'puppeteer-core';
import Browserbase from 'browserbase/index';

// Configuration
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;
const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

async function runPuppeteerSession() {
  try {
    // Create a new session
    console.log('Creating a new session...');
    const session = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
    });
    console.log(`Session created with ID: ${session.id}`);

    // Connect to the browser using Puppeteer
    console.log('Connecting to browser...');
    const browser = await connect({
      browserWSEndpoint: session.connectUrl,
      defaultViewport: null,
    });

    // Create a new page
    const [page] = await browser.pages();
    if (!page) {
      throw new Error('No pages available');
    }

    // Navigate to a website
    console.log('Navigating to Hacker News...');
    await page.goto('https://news.ycombinator.com/');
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);

    // Cleanup
    await browser.disconnect();

    console.log('Session completed successfully!');
    console.log(`View session replay at https://browserbase.com/sessions/${session.id}`);
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Run the script
runPuppeteerSession();
