/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
import { Readable } from 'node:stream';
import { getRuntime as getNodeRuntime } from '../node-runtime';
import { type Shims } from '../registry';

type FetchInitWithAgent = {
  agent?: unknown;
  body?: unknown;
  [key: string]: unknown;
};

function usesNodeFetchOnlyFeatures(init: FetchInitWithAgent | undefined): boolean {
  if (!init) return false;

  // Node's native fetch does not use node:http Agent instances. Preserve
  // historical behavior for callers who explicitly configure httpAgent.
  return Boolean(init.agent);
}

function buildNativeFetchOptions(init: FetchInitWithAgent | undefined): FetchInitWithAgent | undefined {
  if (!init) return init;

  const { agent: _agent, ...fetchInit } = init;

  // Node's native fetch requires `duplex: 'half'` when the body is a stream.
  const body = fetchInit.body;
  if (body instanceof Readable || typeof (body as any)?.pipe === 'function') {
    return { duplex: 'half', ...fetchInit };
  }

  return fetchInit;
}

export function getRuntime(): Shims {
  const nodeRuntime = getNodeRuntime();
  const nativeFetch = (globalThis as any).fetch;

  if (typeof nativeFetch !== 'function') {
    return nodeRuntime;
  }

  return {
    ...nodeRuntime,
    fetch: (url: unknown, init?: FetchInitWithAgent) => {
      if (usesNodeFetchOnlyFeatures(init)) {
        return nodeRuntime.fetch(url, init);
      }

      return nativeFetch.call(undefined, url, buildNativeFetchOptions(init));
    },
    Request:
      typeof (globalThis as any).Request !== 'undefined' ? (globalThis as any).Request : nodeRuntime.Request,
    Response:
      typeof (globalThis as any).Response !== 'undefined' ?
        (globalThis as any).Response
      : nodeRuntime.Response,
    Headers:
      typeof (globalThis as any).Headers !== 'undefined' ? (globalThis as any).Headers : nodeRuntime.Headers,
    getDefaultAgent: () => undefined,
  };
}
