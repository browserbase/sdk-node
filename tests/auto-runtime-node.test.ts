import { getRuntime } from '@browserbasehq/sdk/_shims/auto/runtime';

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
});
