import { join } from 'node:path';
import { chromium } from 'playwright-core';
import Browserbase from 'browserbase/index';

// Configuration
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;
const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;
const UPLOAD_TEST_URL = 'https://browser-tests-alpha.vercel.app/api/upload-test';

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

async function testFileUpload() {
  try {
    // Create a new session
    console.log('Creating a new session...');
    const session = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
    });

    console.log(`Session created with ID: ${session.id}`);
    const browser = await chromium.connectOverCDP(session.connectUrl);

    const context = browser.contexts()[0]!;
    const page = context.pages()[0]!;

    // Navigate to upload test page
    console.log('Navigating to upload test page...');
    await page.goto(UPLOAD_TEST_URL);

    // Perform file upload
    console.log('Uploading file...');
    const fileInput = page.locator('#fileUpload');
    const filePath = join(__dirname, 'packages/logo.png');
    await fileInput.setInputFiles(filePath);

    // Verify upload
    const fileNameSpan = page.locator('#fileName');
    const fileName = await fileNameSpan.innerText();

    const fileSizeSpan = page.locator('#fileSize');
    const fileSize = Number(await fileSizeSpan.innerText());

    console.log('Upload results:');
    console.log('- File name:', fileName);
    console.log('- File size:', fileSize, 'bytes');

    if (fileName === 'logo.png' && fileSize > 0) {
      console.log('File upload successful!');
    } else {
      throw new Error('File upload verification failed');
    }

    // Cleanup
    await page.close();
    await browser.close();

    console.log(`View session replay at https://browserbase.com/sessions/${session.id}`);
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Run the script
testFileUpload();
