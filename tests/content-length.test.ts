import Browserbase from '@browserbasehq/sdk';
import type { Fetch, Response } from '@browserbasehq/sdk/core';
import http from 'node:http';
import type { AddressInfo } from 'node:net';

type RequestCapture = {
  body: string;
  contentLength: string | undefined;
};

async function captureRequest(
  options: { fetch?: Fetch; httpAgent?: http.Agent } = {},
): Promise<RequestCapture> {
  let resolveCapture: (capture: RequestCapture) => void;
  let rejectCapture: (error: Error) => void;
  const captured = new Promise<RequestCapture>((resolve, reject) => {
    resolveCapture = resolve;
    rejectCapture = reject;
  });

  const server = http.createServer((request, response) => {
    const chunks: Buffer[] = [];

    request.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    request.on('error', rejectCapture);
    request.on('aborted', () => rejectCapture(new Error('request aborted before the body was received')));
    request.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end('{}');
      resolveCapture({ body, contentLength: request.headers['content-length'] });
    });
  });

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const { port } = server.address() as AddressInfo;
  const client = new Browserbase({
    apiKey: 'My API Key',
    baseURL: `http://127.0.0.1:${port}`,
    maxRetries: 0,
    ...options,
  });

  try {
    await client.post('/foo', { body: { value: 'café 🌍' } });
    return await captured;
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

describe('Content-Length on the wire', () => {
  const prettyBody = JSON.stringify({ value: 'café 🌍' }, null, 2);

  test('native fetch calculates the byte length', async () => {
    const request = await captureRequest();

    expect(request.body).toBe(prettyBody);
    expect(request.contentLength).toBe(String(Buffer.byteLength(prettyBody)));
  });

  test('node-fetch calculates the byte length when an HTTP agent is provided', async () => {
    const httpAgent = new http.Agent({ keepAlive: false });

    try {
      const request = await captureRequest({ httpAgent });

      expect(request.body).toBe(prettyBody);
      expect(request.contentLength).toBe(String(Buffer.byteLength(prettyBody)));
    } finally {
      httpAgent.destroy();
    }
  });

  test('fetch middleware can transform the body before the byte length is calculated', async () => {
    const minifyingFetch: Fetch = async (url, init) => {
      const body = typeof init?.body === 'string' ? JSON.stringify(JSON.parse(init.body)) : init?.body;
      const nativeInit = { ...init, body } as unknown as Parameters<typeof globalThis.fetch>[1];
      return (await globalThis.fetch(String(url), nativeInit)) as unknown as Response;
    };

    const request = await captureRequest({ fetch: minifyingFetch });
    const minifiedBody = JSON.stringify(JSON.parse(prettyBody));

    expect(request.body).toBe(minifiedBody);
    expect(request.contentLength).toBe(String(Buffer.byteLength(minifiedBody)));
  });
});
