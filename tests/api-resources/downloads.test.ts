// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Browserbase from '@browserbasehq/sdk';
import { Response } from '@browserbasehq/sdk/_shims/index';

const client = new Browserbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource downloads', () => {
  test('retrieve', async () => {
    const responsePromise = client.downloads.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.downloads.retrieve('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });

  test('list: only required params', async () => {
    const responsePromise = client.downloads.list({ sessionId: 'sessionId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: required and optional params', async () => {
    const response = await client.downloads.list({
      sessionId: 'sessionId',
      createdAfter: '2019-12-27T18:11:19.117Z',
      createdBefore: '2019-12-27T18:11:19.117Z',
      filename: 'filename',
      limit: 1,
      maxSize: 0,
      mimeType: 'mimeType',
      minSize: 0,
      offset: 0,
    });
  });

  test('delete', async () => {
    const responsePromise = client.downloads.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.downloads.delete('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });

  test('download: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.downloads.download('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });
});
