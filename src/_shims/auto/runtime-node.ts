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
  if (init.agent) return true;

  // Multipart uploads are encoded as node:stream Readable bodies by the Node
  // runtime shim. Keep those on node-fetch to avoid requiring undici's
  // stream-specific `duplex` option here.
  const body = init.body;
  return body instanceof Readable || typeof (body as any)?.pipe === 'function';
}

function stripNodeFetchOptions(init: FetchInitWithAgent | undefined): FetchInitWithAgent | undefined {
  if (!init || !('agent' in init)) return init;

  const { agent: _agent, ...fetchInit } = init;
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

      return nativeFetch.call(undefined, url, stripNodeFetchOptions(init));
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
