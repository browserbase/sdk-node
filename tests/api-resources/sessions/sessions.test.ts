// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Browserbase from '@browserbasehq/sdk';
import { Response } from 'node-fetch';

const client = new Browserbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sessions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.sessions.create({ projectId: 'projectId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.sessions.create({
      projectId: 'projectId',
      browserSettings: {
        advancedStealth: true,
        blockAds: true,
        captchaImageSelector: 'captchaImageSelector',
        captchaInputSelector: 'captchaInputSelector',
        context: { id: 'id', persist: true },
        extensionId: 'extensionId',
        fingerprint: {
          browsers: ['chrome'],
          devices: ['desktop'],
          httpVersion: '1',
          locales: ['string'],
          operatingSystems: ['android'],
          screen: { maxHeight: 0, maxWidth: 0, minHeight: 0, minWidth: 0 },
        },
        logSession: true,
        os: 'windows',
        recordSession: true,
        solveCaptchas: true,
        viewport: { height: 0, width: 0 },
      },
      extensionId: 'extensionId',
      keepAlive: true,
      proxies: [
        {
          type: 'browserbase',
          domainPattern: 'domainPattern',
          geolocation: { country: 'xx', city: 'city', state: 'xx' },
        },
      ],
      region: 'us-west-2',
      timeout: 60,
      userMetadata: { foo: 'bar' },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.sessions.retrieve('id');
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
    await expect(client.sessions.retrieve('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });

  test('update: only required params', async () => {
    const responsePromise = client.sessions.update('id', {
      projectId: 'projectId',
      status: 'REQUEST_RELEASE',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.sessions.update('id', {
      projectId: 'projectId',
      status: 'REQUEST_RELEASE',
    });
  });

  test('list', async () => {
    const responsePromise = client.sessions.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.sessions.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sessions.list({ q: 'q', status: 'RUNNING' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Browserbase.NotFoundError);
  });

  test('debug', async () => {
    const responsePromise = client.sessions.debug('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('debug: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.sessions.debug('id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });
});
