import { getRuntime } from '@browserbasehq/sdk/_shims/auto/runtime';
import http from 'node:http';
import { Readable } from 'node:stream';

describe('auto node runtime', () => {
  const originalFetch = (globalThis as any).fetch;

  afterEach(() => {
    (globalThis as any).fetch = originalFetch;
  });

  test('prefers native fetch when available', async () => {
    const response = { ok: true };
    const nativeFetch = jest.fn().mockResolvedValue(response);
    (globalThis as any).fetch = nativeFetch;

    const runtime = getRuntime();

    await expect(runtime.fetch('https://example.com', { method: 'post', body: '{}' })).resolves.toBe(
      response,
    );
    expect(nativeFetch).toHaveBeenCalledWith('https://example.com', { method: 'post', body: '{}' });
    expect(runtime.getDefaultAgent('https://example.com')).toBeUndefined();
  });

  test('uses native fetch for stream bodies with duplex enabled', async () => {
    const response = { ok: true };
    const nativeFetch = jest.fn().mockResolvedValue(response);
    const body = Readable.from(['Example data']);
    (globalThis as any).fetch = nativeFetch;

    const runtime = getRuntime();

    await expect(runtime.fetch('https://example.com', { method: 'post', body })).resolves.toBe(response);
    expect(nativeFetch).toHaveBeenCalledWith('https://example.com', {
      duplex: 'half',
      method: 'post',
      body,
    });
  });

  test('uses node-fetch when an agent is provided', async () => {
    const nativeFetch = jest.fn().mockRejectedValue(new Error('native fetch should not be called'));
    (globalThis as any).fetch = nativeFetch;

    const agent = new http.Agent({ keepAlive: false });

    try {
      const runtime = getRuntime();
      await expect(runtime.fetch('not a url', { agent })).rejects.toThrow();
      expect(nativeFetch).not.toHaveBeenCalled();
    } finally {
      agent.destroy();
    }
  });
});
