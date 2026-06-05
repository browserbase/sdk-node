// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Certificates extends APIResource {
  /**
   * Upload a Certificate
   */
  create(body: CertificateCreateParams, options?: Core.RequestOptions): Core.APIPromise<Certificate> {
    return this._client.post('/v1/certificates', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Get a Certificate
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Certificate> {
    return this._client.get(`/v1/certificates/${id}`, options);
  }

  /**
   * List Certificates
   */
  list(options?: Core.RequestOptions): Core.APIPromise<CertificateListResponse> {
    return this._client.get('/v1/certificates', options);
  }

  /**
   * Delete a Certificate
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/certificates/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface Certificate {
  id: string;

  createdAt: string;

  /**
   * The Project ID linked to the uploaded Certificate.
   */
  projectId: string;

  updatedAt: string;
}

export type CertificateListResponse = Array<Certificate>;

export interface CertificateCreateParams {
  file: Core.Uploadable;
}

export declare namespace Certificates {
  export {
    type Certificate as Certificate,
    type CertificateListResponse as CertificateListResponse,
    type CertificateCreateParams as CertificateCreateParams,
  };
}
