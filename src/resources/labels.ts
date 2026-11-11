// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Labels extends APIResource {
  /**
   * Create a project-owned label.
   */
  create(body: LabelCreateParams, options?: Core.RequestOptions): Core.APIPromise<Label> {
    return this._client.post('/v1/labels', { body, ...options });
  }

  /**
   * Rename a label, preserving its ID, creation time, and session assignments.
   */
  update(labelId: string, body: LabelUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Label> {
    return this._client.patch(`/v1/labels/${labelId}`, { body, ...options });
  }

  /**
   * List the project's labels, newest first. Page by passing the previous response's
   * `nextCursor` as `cursor`; a null `nextCursor` means there are no further pages.
   */
  list(query?: LabelListParams, options?: Core.RequestOptions): Core.APIPromise<LabelListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<LabelListResponse>;
  list(
    query: LabelListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<LabelListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/labels', { query, ...options });
  }

  /**
   * Delete a label and its session assignments, preserving the sessions. Missing and
   * other-project labels are successful no-ops.
   */
  delete(labelId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/labels/${labelId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * A project-owned session label.
 */
export interface Label {
  /**
   * Stable identifier of the label.
   */
  id: string;

  /**
   * UTC timestamp when the label was created.
   */
  createdAt: string;

  /**
   * Display name, unique ignoring case within the project.
   */
  name: string;

  /**
   * The project that owns the label.
   */
  projectId: string;

  /**
   * UTC timestamp when the label was last renamed.
   */
  updatedAt: string;
}

/**
 * A page of labels.
 */
export interface LabelListResponse {
  /**
   * The page of matching labels.
   */
  data: Array<Label>;

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

export interface LabelCreateParams {
  /**
   * Label name. Browserbase trims surrounding Unicode whitespace and preserves
   * display capitalization. The trimmed name must contain 1–128 Unicode characters
   * and no NUL characters. Names are unique ignoring case within the project.
   */
  name: string;
}

export interface LabelUpdateParams {
  /**
   * Label name. Browserbase trims surrounding Unicode whitespace and preserves
   * display capitalization. The trimmed name must contain 1–128 Unicode characters
   * and no NUL characters. Names are unique ignoring case within the project.
   */
  name: string;
}

export interface LabelListParams {
  /**
   * Pagination cursor. Pass the nextCursor from the previous response to fetch the
   * next page. Omit to start from the first page.
   */
  cursor?: string;

  /**
   * Maximum number of results to return.
   */
  limit?: number;
}

export declare namespace Labels {
  export {
    type Label as Label,
    type LabelListResponse as LabelListResponse,
    type LabelCreateParams as LabelCreateParams,
    type LabelUpdateParams as LabelUpdateParams,
    type LabelListParams as LabelListParams,
  };
}
