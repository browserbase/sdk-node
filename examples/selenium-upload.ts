import http, { type ClientRequest } from 'node:http';
import { join } from 'node:path';
import { Builder, By, until } from 'selenium-webdriver';
import Browserbase from 'browserbase/index';
import fs from 'node:fs';
// Configuration
const BROWSERBASE_PROJECT_ID = process.env['BROWSERBASE_PROJECT_ID']!;
const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;
const UPLOAD_TEST_URL = 'https://browser-tests-alpha.vercel.app/api/upload-test';
const UPLOAD_TIMEOUT = 10_000; // 10 seconds

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

    // Upload file to session
    const localFilePath = join(__dirname, 'packages/logo.png');
    const remoteFilePath = '/tmp/.uploads/logo.png';

    console.log('Uploading file to session...');
    await bb.sessions.uploads.create(session.id, {
      file: fs.createReadStream(localFilePath),
    });

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
    const driver = new Builder()
      .forBrowser('chrome')
      .usingHttpAgent(customHttpAgent)
      .usingServer(session.seleniumRemoteUrl)
      .build();

    // Navigate to upload test page
    console.log('Navigating to upload test page...');
    await driver.get(UPLOAD_TEST_URL);

    // Perform file upload
    console.log('Uploading file...');
    const fileInput = await driver.wait(until.elementLocated(By.css('#fileUpload')), UPLOAD_TIMEOUT);
    await fileInput.sendKeys(remoteFilePath);

    // Verify upload
    const fileNameSpan = await driver.findElement(By.css('#fileName'));
    const fileName = await fileNameSpan.getText();

    const fileSizeSpan = await driver.findElement(By.css('#fileSize'));
    const fileSize = Number(await fileSizeSpan.getText());

    console.log('Upload results:');
    console.log('- File name:', fileName);
    console.log('- File size:', fileSize, 'bytes');

    if (fileName === 'logo.png' && fileSize > 0) {
      console.log('File upload successful!');
    } else {
      throw new Error('File upload verification failed');
    }

    // Optional: Take screenshot for debugging
    // const screenshot = await driver.takeScreenshot();
    // await writeFile('selenium-upload.png', screenshot, 'base64');

    // Cleanup
    await driver.quit();

    console.log('Upload test completed successfully!');
    console.log(`View session replay at https://browserbase.com/sessions/${session.id}`);
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Run the script
testFileUpload();
