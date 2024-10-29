import { Browser, connect } from 'puppeteer-core';
import Browserbase from 'browserbase/index';

// Configuration
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;
const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

async function extractFromTable(browser: Browser, cell: string) {
  const [page] = await browser.pages();
  if (!page) {
    throw new Error('No pages available');
  }
  await page.goto('https://www.showmyip.com/');
  await page.waitForSelector('table.iptab');

  const text = await page.evaluate((cell) => {
    // @ts-expect-error
    const rows = Array.from(document.querySelectorAll('table.iptab tr'));
    for (const row of rows) {
      // @ts-expect-error
      const cells = row.querySelectorAll('td');
      if (cells.length > 1 && cells[0].textContent?.trim() === cell) {
        return cells[cells.length - 1].textContent?.trim();
      }
    }
    return null;
  }, cell);

  if (!text) {
    throw new Error(`Failed to extract ${cell}`);
  }
  return text;
}

async function testProxies() {
  try {
    // Test 1: Basic proxy functionality
    console.log('\nTesting basic proxy functionality...');
    const session = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
      proxies: true,
    });

    let browser = await connect({
      browserWSEndpoint: session.connectUrl,
      defaultViewport: null,
    });

    const [page] = await browser.pages();
    if (!page) {
      throw new Error('No pages available');
    }

    await page.goto('https://www.google.com/');
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);

    await browser.disconnect();

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

    browser = await connect({
      browserWSEndpoint: canadaSession.connectUrl,
      defaultViewport: null,
    });

    const country = await extractFromTable(browser, 'Country');
    console.log('Detected country:', country);
    await browser.disconnect();
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

    browser = await connect({
      browserWSEndpoint: nySession.connectUrl,
      defaultViewport: null,
    });

    const state = await extractFromTable(browser, 'Region');
    console.log('Detected state:', state);
    await browser.disconnect();
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

    browser = await connect({
      browserWSEndpoint: laSession.connectUrl,
      defaultViewport: null,
    });

    const city = await extractFromTable(browser, 'City');
    console.log('Detected city:', city);
    await browser.disconnect();
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

    browser = await connect({
      browserWSEndpoint: londonSession.connectUrl,
      defaultViewport: null,
    });

    const londonCity = await extractFromTable(browser, 'City');
    console.log('Detected city:', londonCity);
    await browser.disconnect();
    console.log(`View session replay at https://browserbase.com/sessions/${londonSession.id}`);

    console.log('\nProxy tests completed successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Run the script
testProxies();
