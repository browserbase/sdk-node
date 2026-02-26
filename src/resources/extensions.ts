// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Extensions extends APIResource {
  /**
   * Upload an Extension
   */
  create(
    body: ExtensionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ExtensionCreateResponse> {
    return this._client.post('/v1/extensions', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Get an Extension
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<ExtensionRetrieveResponse> {
    return this._client.get(`/v1/extensions/${id}`, options);
  }

  /**
   * Delete an Extension
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/extensions/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ExtensionCreateResponse {
  id: string;

  createdAt: string;

  fileName: string;

  /**
   * The Project ID linked to the uploaded Extension.
   */
  projectId: string;

  updatedAt: string;
}

export interface ExtensionRetrieveResponse {
  id: string;

  createdAt: string;

  fileName: string;

  /**
   * The Project ID linked to the uploaded Extension.
   */
  projectId: string;

  updatedAt: string;
}

export interface ExtensionCreateParams {
  file: Core.Uploadable;
}

export declare namespace Extensions {
  export {
    type ExtensionCreateResponse as ExtensionCreateResponse,
    type ExtensionRetrieveResponse as ExtensionRetrieveResponse,
    type ExtensionCreateParams as ExtensionCreateParams,
  };
}
