// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as SecretsAPI from '../secrets';

export class Secrets extends APIResource {
  /**
   * List secrets attached to a function. Supports filtering by secret creation time.
   * Returns metadata only.
   */
  list(
    id: string,
    query?: SecretListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SecretListResponse>;
  list(id: string, options?: Core.RequestOptions): Core.APIPromise<SecretListResponse>;
  list(
    id: string,
    query: SecretListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<SecretListResponse> {
    if (isRequestOptions(query)) {
      return this.list(id, {}, query);
    }
    return this._client.get(`/v1/functions/${id}/secrets`, { query, ...options });
  }

  /**
   * Attach a secret to a Function, taking effect on the Function's next invocation.
   * Note: Attaching a secret that is already attached succeeds to support
   * idempotency.
   */
  attach(id: string, body: SecretAttachParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/v1/functions/${id}/secrets`, {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Detach a secret from a Function, taking effect on the Function's next
   * invocation. Note: Detaching a secret that is not attached succeeds to support
   * idempotency.
   */
  detach(id: string, secretId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/functions/${id}/secrets/${secretId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * A page of secrets.
 */
export interface SecretListResponse {
  /**
   * The page of matching secrets.
   */
  data: Array<SecretsAPI.Secret>;

  /**
   * The maximum number of results returned in this page.
   */
  limit: number;

  /**
   * Cursor for the next page. Pass it back as `cursor` on the next request to
   * continue paging. null when there are no more results.
   */
  nextCursor: string | null;
}

export interface SecretListParams {
  /**
   * Pagination cursor. Pass the nextCursor from the previous response to fetch the
   * next page. Keep the same filters across pages. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Only return secrets created on or before this timestamp (inclusive). RFC 3339,
   * e.g. 2026-01-20T00:00:00Z.
   */
  endAt?: string;

  /**
   * Maximum number of results to return.
   */
  limit?: number;

  /**
   * Only return secrets created on or after this timestamp (inclusive). RFC 3339,
   * e.g. 2026-01-19T00:00:00Z.
   */
  startAt?: string;
}

export interface SecretAttachParams {
  /**
   * The id of the project secret to attach (the `id` returned by POST /v1/secrets).
   * Idempotent: re-attaching an already-attached secret succeeds.
   */
  secretId: string;
}

export declare namespace Secrets {
  export {
    type SecretListResponse as SecretListResponse,
    type SecretListParams as SecretListParams,
    type SecretAttachParams as SecretAttachParams,
  };
}
