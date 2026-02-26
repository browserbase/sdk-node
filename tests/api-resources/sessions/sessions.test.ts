// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Browserbase from '@browserbasehq/sdk';
import { Response } from 'node-fetch';

const client = new Browserbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sessions', () => {
  test('create', async () => {
    const responsePromise = client.sessions.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.sessions.create({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });

  test('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sessions.create(
        {
          browserSettings: {
            advancedStealth: true,
            blockAds: true,
            captchaImageSelector: 'captchaImageSelector',
            captchaInputSelector: 'captchaInputSelector',
            context: { id: 'id', persist: true },
            extensionId: 'extensionId',
            logSession: true,
            os: 'windows',
            recordSession: true,
            solveCaptchas: true,
            viewport: { height: 0, width: 0 },
          },
          extensionId: 'extensionId',
          keepAlive: true,
          projectId: 'projectId',
          proxies: [
            {
              type: 'browserbase',
              domainPattern: 'domainPattern',
              geolocation: {
                country: 'xx',
                city: 'city',
                state: 'xx',
              },
            },
          ],
          region: 'us-west-2',
          timeout: 60,
          userMetadata: { foo: 'bar' },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Browserbase.NotFoundError);
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
    const responsePromise = client.sessions.update('id', { status: 'REQUEST_RELEASE' });
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
      status: 'REQUEST_RELEASE',
      projectId: 'projectId',
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
