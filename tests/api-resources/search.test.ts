// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Browserbase from '@browserbasehq/sdk';
import { Response } from 'node-fetch';

const client = new Browserbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  test('web: only required params', async () => {
    const responsePromise = client.search.web({ query: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('web: required and optional params', async () => {
    const response = await client.search.web({ query: 'x', numResults: 1 });
  });
});
