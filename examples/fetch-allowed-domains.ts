import Browserbase from '@browserbasehq/sdk';

const BROWSERBASE_API_KEY = process.env['BROWSERBASE_API_KEY']!;

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

(async () => {
  // A host on the list (or a subdomain of one) is fetched as usual.
  const page = await bb.fetchAPI.create({
    url: 'https://example.com/',
    allowedDomains: ['example.com'],
  });
  console.log(`Fetched ${page.statusCode} from example.com`);

  // Any other host, or a redirect to one, is rejected with a 400 before it is reached.
  try {
    await bb.fetchAPI.create({
      url: 'https://example.com/',
      allowedDomains: ['example.org'],
    });
  } catch (error) {
    if (error instanceof Browserbase.BadRequestError) {
      console.log(`Blocked: ${error.message}`);
    } else {
      throw error;
    }
  }
})().catch((error) => console.error(error.message));
