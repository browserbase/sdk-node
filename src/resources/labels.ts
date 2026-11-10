// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
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

export declare namespace Labels {
  export {
    type Label as Label,
    type LabelCreateParams as LabelCreateParams,
    type LabelUpdateParams as LabelUpdateParams,
  };
}
