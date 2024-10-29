import { chromium } from 'playwright-core';
import Browserbase from 'browserbase/index';

const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

(async () => {
  // Create a new session
  const session = await bb.sessions.create({
    projectId: BROWSERBASE_PROJECT_ID,
  });

  // Connect to the session
  const browser = await chromium.connectOverCDP(session.connectUrl);

  // Getting the default context to ensure the sessions are recorded.
  const defaultContext = browser.contexts()[0];
  const page = defaultContext?.pages()[0];

  await page?.goto('https://browserbase.com/');
  await page?.close();
  await browser.close();
  console.log(`Session complete! View replay at https://browserbase.com/sessions/${session.id}`);
})().catch((error) => console.error(error.message));
