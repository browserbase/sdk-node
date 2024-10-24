// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Browserbase from 'browserbase';

const client = new Browserbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource downloads', () => {
  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.sessions.downloads.list('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });
});
