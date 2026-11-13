// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Certificates extends APIResource {
  /**
   * Upload a PEM file with one or more CA certificates (up to 100 MB). Pass the
   * returned ID in `proxySettings.caCertificates` when creating a session so the
   * browser trusts these certificates.
   */
  create(body: CertificateCreateParams, options?: Core.RequestOptions): Core.APIPromise<Certificate> {
    return this._client.post('/v1/certificates', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Retrieve metadata for an uploaded certificate by its ID, including its project
   * ID and timestamps. The PEM content is not returned.
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
   * Delete an uploaded certificate from your project by its ID. Session creation
   * requests that still reference this ID in `proxySettings.caCertificates` fail
   * with HTTP 400.
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
