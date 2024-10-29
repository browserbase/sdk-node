import Browserbase from '@browserbasehq/sdk';
import { chromium } from 'playwright-core';

// Configuration
const DEFAULT_CAPTCHA_URL = 'https://2captcha.com/demo/recaptcha-v2';
const OVERRIDE_TIMEOUT = 60_000; // 1 minute in milliseconds
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;
const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

async function solveCaptcha() {
  // Create a session with captcha solving enabled
  const session = await bb.sessions.create({
    projectId: BROWSERBASE_PROJECT_ID,
    browserSettings: {
      solveCaptchas: true,
    },
    proxies: true,
  });
  try {
    // Connect to the browser
    const browser = await chromium.connectOverCDP(session.connectUrl);

    const context = browser.contexts()[0]!;
    const page = context.pages()[0]!;

    let captchaSolvingStarted = false;
    let captchaSolvingFinished = false;

    // Listen for console messages
    page.on('console', (msg) => {
      if (msg.text() === 'browserbase-solving-started') {
        captchaSolvingStarted = true;
        console.log('Captcha solving started...');
        page.evaluate(() => {
          // @ts-ignore
          window.captchaSolvingFinished = false;
        });
      } else if (msg.text() === 'browserbase-solving-finished') {
        captchaSolvingFinished = true;
        console.log('Captcha solving finished!');
        page.evaluate(() => {
          // @ts-ignore
          window.captchaSolvingFinished = true;
        });
      }
    });

    // Navigate to the captcha page
    console.log('Navigating to captcha page...');
    await page.goto(DEFAULT_CAPTCHA_URL, { waitUntil: 'networkidle' });

    // Wait for captcha to be solved
    // @ts-ignore
    await page.waitForFunction(() => window.captchaSolvingFinished === true, null, {
      timeout: OVERRIDE_TIMEOUT,
    });

    // Cleanup
    await page.close();
    await browser.close();

    console.log('Captcha solving started:', captchaSolvingStarted);
    console.log('Captcha solving finished:', captchaSolvingFinished);
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  } finally {
    console.log(`View replay at https://browserbase.com/sessions/${session.id}`);
  }
}

// Run the script
solveCaptcha();
