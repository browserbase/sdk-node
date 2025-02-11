import { chromium, type Browser } from 'playwright-core';
import Browserbase from '@browserbasehq/sdk';

// Configuration
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;
const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

async function extractFromTable(browser: Browser, cell: string) {
  const context = browser.contexts()[0]!;
  const page = context.pages()[0]!;
  await page.goto('https://www.showmyip.com/');
  await page.waitForSelector('table.iptab');

  const td = page.locator(`table.iptab tr:has-text("${cell}") td:last-child`);
  const text = await td.textContent();
  if (!text) {
    throw new Error(`Failed to extract ${cell}`);
  }
  return text.trim();
}

async function testProxies() {
  try {
    // Test 1: Basic proxy functionality
    console.log('\nTesting basic proxy functionality...');
    const session = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
      proxies: true,
    });

    let browser = await chromium.connectOverCDP(session.connectUrl);
    const page = browser.contexts()[0]!.pages()[0]!;

    await page.goto('https://www.google.com');
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);

    await page.close();
    await browser.close();

    const updatedSession = await bb.sessions.retrieve(session.id);
    console.log('Proxy bytes used:', updatedSession.proxyBytes);
    console.log(`View session replay at https://browserbase.com/sessions/${session.id}`);

    // Test 2: Geolocation - Canada
    console.log('\nTesting proxy geolocation - Canada...');
    const canadaSession = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
      proxies: [
        {
          type: 'browserbase',
          geolocation: {
            country: 'CA',
          },
        },
      ],
    });

    browser = await chromium.connectOverCDP(canadaSession.connectUrl);
    const country = await extractFromTable(browser, 'Country');
    console.log('Detected country:', country);
    await browser.close();
    console.log(`View session replay at https://browserbase.com/sessions/${canadaSession.id}`);

    // Test 3: Geolocation - New York
    console.log('\nTesting proxy geolocation - New York...');
    const nySession = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
      proxies: [
        {
          type: 'browserbase',
          geolocation: {
            country: 'US',
            state: 'NY',
          },
        },
      ],
    });

    browser = await chromium.connectOverCDP(nySession.connectUrl);
    const state = await extractFromTable(browser, 'Region');
    console.log('Detected state:', state);
    await browser.close();
    console.log(`View session replay at https://browserbase.com/sessions/${nySession.id}`);

    // Test 4: Geolocation - Los Angeles
    console.log('\nTesting proxy geolocation - Los Angeles...');
    const laSession = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
      proxies: [
        {
          type: 'browserbase',
          geolocation: {
            country: 'US',
            state: 'CA',
            city: 'Los Angeles',
          },
        },
      ],
    });

    browser = await chromium.connectOverCDP(laSession.connectUrl);
    const city = await extractFromTable(browser, 'City');
    console.log('Detected city:', city);
    await browser.close();
    console.log(`View session replay at https://browserbase.com/sessions/${laSession.id}`);

    // Test 5: Geolocation - London
    console.log('\nTesting proxy geolocation - London...');
    const londonSession = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
      proxies: [
        {
          type: 'browserbase',
          geolocation: {
            country: 'GB',
            city: 'London',
          },
        },
      ],
    });

    browser = await chromium.connectOverCDP(londonSession.connectUrl);
    const londonCity = await extractFromTable(browser, 'City');
    console.log('Detected city:', londonCity);
    await browser.close();
    console.log(`View session replay at https://browserbase.com/sessions/${londonSession.id}`);

    console.log('\nProxy tests completed successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Run the script
testProxies();
