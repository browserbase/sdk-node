import Browserbase, { NotFoundError, type ClientOptions } from '@browserbasehq/sdk';
import nodeFetch from 'node-fetch';
import { once } from 'node:events';
import {
  createServer,
  type IncomingHttpHeaders,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from 'node:http';
import { type AddressInfo } from 'node:net';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const sessionId = '00000000-0000-4000-8000-000000000001';
const download = (id: string) => ({
  id,
  sessionId,
  filename: 'report.json',
  mimeType: 'application/json',
  size: 12,
  checksum: 'a'.repeat(64),
  createdAt: '2026-09-01T00:00:00Z',
});

type RecordedRequest = { method: string | undefined; url: URL; headers: IncomingHttpHeaders };
type Handler = (req: IncomingMessage, res: ServerResponse) => void;

const servers: Server[] = [];

afterEach(async () => {
  for (const server of servers.splice(0)) {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});

function json(res: ServerResponse, data: unknown) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// The default runtime uses Node's native fetch; node-fetch is what callers on older setups pass in.
describe.each<[string, Pick<ClientOptions, 'fetch'>]>([
  ['native fetch', {}],
  ['node-fetch', { fetch: nodeFetch as unknown as NonNullable<ClientOptions['fetch']> }],
])('downloads with %s', (_, fetchOptions) => {
  async function clientFor(handler: Handler) {
    const requests: RecordedRequest[] = [];
    const server = createServer((req, res) => {
      requests.push({
        method: req.method,
        url: new URL(req.url ?? '/', 'http://localhost'),
        headers: req.headers,
      });
      handler(req, res);
    });
    servers.push(server);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const client = new Browserbase({
      apiKey: 'test-key',
      baseURL: `http://127.0.0.1:${(server.address() as AddressInfo).port}`,
      maxRetries: 0,
      ...fetchOptions,
    });
    return { client, requests };
  }

  test('auto-pagination preserves filters, advances from response offset, and stops at total', async () => {
    const { client, requests } = await clientFor((req, res) => {
      const offset = Number(new URL(req.url ?? '/', 'http://localhost').searchParams.get('offset'));
      json(res, { downloads: [download(String(offset))], offset, limit: 2, total: 4 });
    });
    const filters = {
      sessionId,
      filename: 'a report & summary.json',
      mimeType: 'application/json',
      minSize: 0,
      maxSize: 1024,
      createdAfter: '2026-09-01T00:00:00Z',
      createdBefore: '2026-09-02T00:00:00Z',
      limit: 2,
      offset: 2,
    };
    const page = await client.downloads.list(filters);
    expect(requests).toHaveLength(1);
    expect([page.limit, page.offset, page.total]).toEqual([2, 2, 4]);
    const ids: string[] = [];
    for await (const item of page) ids.push(item.id);
    expect(ids).toEqual(['2', '3']);
    expect(requests).toHaveLength(2);
    for (const [index, request] of requests.entries()) {
      expect(request.url.pathname).toBe('/v1/downloads');
      expect(request.headers['x-bb-api-key']).toBe('test-key');
      expect(Object.fromEntries(request.url.searchParams)).toEqual({
        ...Object.fromEntries(Object.entries(filters).map(([key, value]) => [key, String(value)])),
        offset: String(index + 2),
      });
    }
  });

  test('empty pages stop iteration even when total has become stale', async () => {
    const { client, requests } = await clientFor((_, res) => {
      json(res, { downloads: [], offset: 0, limit: 20, total: 10 });
    });
    const items = [];
    for await (const item of client.downloads.list({ sessionId })) items.push(item);
    expect(items).toEqual([]);
    expect(requests).toHaveLength(1);
    expect(requests[0]!.url.searchParams.has('limit')).toBe(false);
  });

  test('metadata, deletion, errors, and the legacy ZIP endpoint retain their contracts', async () => {
    const { client, requests } = await clientFor((req, res) => {
      if (req.method === 'DELETE') return void res.writeHead(204).end();
      if (req.url?.endsWith('/missing')) {
        return void res.writeHead(404, { 'Content-Type': 'application/json' }).end('{"message":"Not found"}');
      }
      if (req.url?.includes('/sessions/')) {
        return void res.writeHead(200, { 'Content-Type': 'application/zip' }).end('PK');
      }
      json(res, download('file-id'));
    });
    expect((await client.downloads.retrieve('file-id')).id).toBe('file-id');
    expect(requests[0]!.headers.accept).toBe('application/json');
    expect(await client.downloads.delete('file-id')).toBeNull();
    await expect(client.downloads.download('missing')).rejects.toThrow(NotFoundError);
    const zip = await client.sessions.downloads.list(sessionId);
    expect(await zip.text()).toBe('PK');
    expect(requests[3]!.headers.accept).toBe('application/zip');
    expect(requests[3]!.url.pathname).toBe(`/v1/sessions/${sessionId}/downloads`);
  });

  test.each(['application/octet-stream', 'application/json'])(
    'streams %s before completion with backpressure',
    async (contentType) => {
      // The server cannot finish until the caller consumes the first chunk.
      // An implementation that eagerly buffers the body will deadlock this test.
      let finish = () => {};
      const { client, requests } = await clientFor((_, res) => {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Disposition': 'attachment; filename="file"',
        });
        res.write('first');
        finish = () => {
          finish = () => {};
          res.end('last');
        };
      });
      const response = await client.downloads.download('file-id');
      expect(response.bodyUsed).toBe(false);
      expect(requests[0]!.url.pathname).toBe('/v1/downloads/file-id');
      expect(requests[0]!.headers.accept).not.toContain('application/json');
      expect(response.headers.get('content-type')).toBe(contentType);
      expect(response.headers.get('content-disposition')).toContain('attachment');
      const chunks: Uint8Array[] = [];
      await pipeline(
        response.body!,
        new Writable({
          highWaterMark: 1,
          write(chunk: Uint8Array, __, callback) {
            chunks.push(chunk);
            finish();
            setImmediate(callback);
          },
        }),
      );
      expect(Buffer.concat(chunks).toString()).toBe('firstlast');
    },
    5000,
  );

  test('empty files stream successfully', async () => {
    const { client } = await clientFor((_, res) => res.writeHead(200).end());
    const response = await client.downloads.download('empty');
    expect((await response.arrayBuffer()).byteLength).toBe(0);
  });

  test('an aborted download closes its stream', async () => {
    const controller = new AbortController();
    let closed = () => {};
    const connectionClosed = new Promise<void>((resolve) => {
      closed = resolve;
    });
    const { client } = await clientFor((_, res) => {
      res.once('close', closed);
      res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
      res.write('first');
    });
    const response = await client.downloads.download('file-id', { signal: controller.signal });
    const consumed = pipeline(
      response.body!,
      new Writable({
        write(_, __, callback) {
          controller.abort();
          callback();
        },
      }),
    );
    await expect(consumed).rejects.toMatchObject({ name: 'AbortError' });
    await connectionClosed;
  }, 5000);
});
