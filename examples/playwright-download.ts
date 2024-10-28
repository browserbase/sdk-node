import Browserbase from 'browserbase/index';
import { chromium } from 'playwright-core';
import AdmZip from 'adm-zip';

// Configuration
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;
const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;
const DOWNLOAD_TEST_URL = 'https://browser-tests-alpha.vercel.app/api/download-test';
const EXPECTED_FILE_SIZE = 6137541;
const downloadRe = /sandstorm-(\d{13})+\.mp3/;

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

async function getDownload(sessionId: string): Promise<Buffer> {
  const response = await bb.sessions.downloads.list(sessionId);
  return Buffer.from(await response.arrayBuffer());
}

async function runSessionWithDownload() {
  try {
    console.log('Creating a new session...');
    const session = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
    });

    console.log(`Session created with ID: ${session.id}`);
    const browser = await chromium.connectOverCDP(session.connectUrl);

    const context = browser.contexts()[0]!;
    const page = context.pages()[0]!;

    // Set up CDP session for download handling
    console.log('Configuring download behavior...');
    const client = await context.newCDPSession(page);
    await client.send('Browser.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: 'downloads',
      eventsEnabled: true,
    });

    // Navigate to download test page
    console.log('Navigating to download test page...');
    await page.goto(DOWNLOAD_TEST_URL);

    // Initiate download
    console.log('Initiating download...');
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#download').click()]);

    const downloadError = await download.failure();
    if (downloadError !== null) {
      throw new Error(`Download failed: ${downloadError}`);
    }

    // Cleanup browser
    await page.close();
    await browser.close();

    // Verify download
    console.log('Verifying download...');
    const zipBuffer = await getDownload(session.id);

    if (zipBuffer.length === 0) {
      throw new Error('Download buffer is empty');
    }

    const zip = new AdmZip(zipBuffer);
    const zipEntries = zip.getEntries();
    const mp3Entry = zipEntries.find((entry) => downloadRe.test(entry.entryName));

    if (!mp3Entry) {
      throw new Error(
        `Missing file matching "${downloadRe.toString()}" in zip entries: ${JSON.stringify(
          zipEntries.map((entry) => entry.entryName),
        )}`,
      );
    }

    if (mp3Entry.header.size !== EXPECTED_FILE_SIZE) {
      throw new Error(`File size mismatch. Expected: ${EXPECTED_FILE_SIZE}, Got: ${mp3Entry.header.size}`);
    }

    console.log('Download test completed successfully!');
    console.log(`File size verified: ${mp3Entry.header.size} bytes`);
    console.log(`View session replay at https://browserbase.com/sessions/${session.id}`);
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Run the script
runSessionWithDownload();
