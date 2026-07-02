// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Browserbase from '@browserbasehq/sdk';
import { Response } from '@browserbasehq/sdk/_shims/index';

const client = new Browserbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource runs', () => {
  test('create: only required params', async () => {
    const responsePromise = client.agents.runs.create({ task: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.agents.runs.create({
      task: 'x',
      agentId: 'agentId',
      browserSettings: {
        context: { id: 'id', persist: true },
        proxies: true,
        verified: true,
      },
      resultSchema: { foo: 'bar' },
      variables: { foo: { value: 'value', description: 'description' } },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.agents.runs.retrieve('runId');
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
    await expect(client.agents.runs.retrieve('runId', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });

  test('list', async () => {
    const responsePromise = client.agents.runs.list();
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
    await expect(client.agents.runs.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      Browserbase.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agents.runs.list(
        {
          agentId: 'agentId',
          cursor: 'cursor',
          endAt: '2019-12-27T18:11:19.117Z',
          limit: 1,
          startAt: '2019-12-27T18:11:19.117Z',
          status: 'PENDING',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Browserbase.NotFoundError);
  });

  test('listMessages', async () => {
    const responsePromise = client.agents.runs.listMessages('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listMessages: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agents.runs.listMessages('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(Browserbase.NotFoundError);
  });

  test('listMessages: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agents.runs.listMessages(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          all: true,
          limit: 1,
          since: 'since',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Browserbase.NotFoundError);
  });
});
