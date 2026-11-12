// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Certificates extends APIResource {
  /**
   * Upload a PEM-encoded CA certificate file to your project for use in browser
   * sessions.
   */
  create(body: CertificateCreateParams, options?: Core.RequestOptions): Core.APIPromise<Certificate> {
    return this._client.post('/v1/certificates', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Retrieve metadata for an uploaded certificate by its ID.
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Certificate> {
    return this._client.get(`/v1/certificates/${id}`, options);
  }

  /**
   * List the certificates uploaded to your project.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<CertificateListResponse> {
    return this._client.get('/v1/certificates', options);
  }

  /**
   * Delete an uploaded certificate from your project by its ID.
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
