import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright-core';
import AdmZip from 'adm-zip';
import Browserbase from '@browserbasehq/sdk';

// Configuration
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;
const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;
const BROWSERBASE_API_URL = process.env['BROWSERBASE_API_URL']!;
const EXTENSION_TIMEOUT = 5000; // 5 seconds
const PROXY_EXTENSION_TIMEOUT = 10000; // 10 seconds

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

function zipExtension() {
  const zip = new AdmZip();
  zip.addLocalFolder(join(__dirname, './packages/extensions/browserbase-test'));
  const name = `extension-${Date.now().toString()}.zip`;
  const dest = join(tmpdir(), name);
  zip.writeZip(dest);
  return { dest };
}

async function createExtension() {
  const { dest } = zipExtension();
  try {
    const res = await bb.extensions.create({
      file: createReadStream(dest),
    });

    return res.id;
  } catch (error) {
    console.error('Failed to create extension:', error);
    throw error;
  }
}

async function waitForExtensionMessage(page: any, timeout: number) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Extension message timeout exceeded'));
    }, timeout);

    page.on('console', (msg: any) => {
      if (msg.text().includes('browserbase test extension image loaded')) {
        clearTimeout(timeoutId);
        resolve(msg.text());
      }
    });
  });
}

async function testExtension() {
  let extensionId: string;

  try {
    // Step 1: Create extension
    console.log('Creating extension...');
    extensionId = await createExtension();
    console.log(`Extension created with ID: ${extensionId}`);

    // Step 2: Test extension without proxies
    console.log('\nTesting extension without proxies...');
    const session = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
      extensionId,
    });

    const browser = await chromium.connectOverCDP(session.connectUrl);
    const context = browser.contexts()[0]!;
    const page = context.pages()[0]!;

    console.log('Navigating to test page...');
    const messagePromise = waitForExtensionMessage(page, EXTENSION_TIMEOUT);
    await page.goto('https://www.browserbase.com/');
    await messagePromise;
    console.log('Extension loaded successfully without proxies');

    await page.close();
    await browser.close();
    console.log(`Session complete, view replay at https://browserbase.com/sessions/${session.id}`);

    // Step 3: Test extension with proxies
    console.log('\nTesting extension with proxies...');
    const proxySession = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
      extensionId,
      proxies: true,
    });

    const proxyBrowser = await chromium.connectOverCDP(proxySession.connectUrl);
    const proxyContext = proxyBrowser.contexts()[0]!;
    const proxyPage = proxyContext.pages()[0]!;

    console.log('Navigating to test page with proxies...');
    const proxyMessagePromise = waitForExtensionMessage(proxyPage, PROXY_EXTENSION_TIMEOUT);
    await proxyPage.goto('https://www.browserbase.com/');
    await proxyMessagePromise;
    console.log('Extension loaded successfully with proxies');

    await proxyPage.close();
    await proxyBrowser.close();
    console.log(`Session complete, view replay at https://browserbase.com/sessions/${proxySession.id}`);
  } catch (error) {
    console.error('\nAn error occurred:', error);
    process.exit(1);
  }
}

// Run the script
testExtension();
