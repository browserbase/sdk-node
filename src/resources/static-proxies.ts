// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class StaticProxies extends APIResource {
  /**
   * List enabled static proxy IDs assigned to your organization, newest first.
   */
  list(
    query?: StaticProxyListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<StaticProxyListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<StaticProxyListResponse>;
  list(
    query: StaticProxyListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<StaticProxyListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/static-proxies', { query, ...options });
  }
}

export interface StaticProxyListResponse {
  /**
   * IDs of enabled static proxies. Use as proxyId when creating a session.
   */
  data: Array<string>;

  limit: number;

  /**
   * Pass as cursor for the next page; null on the last page.
   */
  nextCursor: string | null;
}

export interface StaticProxyListParams {
  cursor?: string;

  limit?: number;
}

export declare namespace StaticProxies {
  export {
    type StaticProxyListResponse as StaticProxyListResponse,
    type StaticProxyListParams as StaticProxyListParams,
  };
}
