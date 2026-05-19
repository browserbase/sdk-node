// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class FetchAPI extends APIResource {
  /**
   * Fetch a page and return its content, headers, and metadata.
   */
  create(body: FetchAPICreateParams, options?: Core.RequestOptions): Core.APIPromise<FetchAPICreateResponse> {
    return this._client.post('/v1/fetch', { body, ...options });
  }
}

export interface FetchAPICreateResponse {
  /**
   * Unique identifier for the fetch request
   */
  id: string;

  /**
   * The response body content. A string for `raw` and `markdown` formats; a
   * structured object for `json` format (the schema-extracted result).
   */
  content: string | { [key: string]: unknown };

  /**
   * The MIME type of the response
   */
  contentType: string;

  /**
   * The character encoding of the response
   */
  encoding: string;

  /**
   * Response headers as key-value pairs
   */
  headers: { [key: string]: string };

  /**
   * HTTP status code of the fetched response
   */
  statusCode: number;
}

export interface FetchAPICreateParams {
  /**
   * The URL to fetch
   */
  url: string;

  /**
   * Whether to bypass TLS certificate verification
   */
  allowInsecureSsl?: boolean;

  /**
   * Whether to follow HTTP redirects
   */
  allowRedirects?: boolean;

  /**
   * Output format for the response content. `raw` (default) returns the response
   * body unchanged; `json` returns structured data (requires `schema`); `markdown`
   * returns the page as markdown.
   */
  format?: 'raw' | 'json' | 'markdown';

  /**
   * Whether to enable proxy support for the request
   */
  proxies?: boolean;

  /**
   * JSON Schema describing the desired structure of the response. Only used when
   * `format` is `json`.
   */
  schema?: { [key: string]: unknown };
}

export declare namespace FetchAPI {
  export {
    type FetchAPICreateResponse as FetchAPICreateResponse,
    type FetchAPICreateParams as FetchAPICreateParams,
  };
}
