// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Secrets extends APIResource {
  /**
   * Create Secret
   */
  create(body: SecretCreateParams, options?: Core.RequestOptions): Core.APIPromise<Secret> {
    return this._client.post('/v1/secrets', { body, ...options });
  }

  /**
   * Get Secret
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Secret> {
    return this._client.get(`/v1/secrets/${id}`, options);
  }

  /**
   * Replace a secret's value. The name cannot be changed; to rename, create a new
   * secret and delete the old one.
   */
  update(id: string, body: SecretUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Secret> {
    return this._client.patch(`/v1/secrets/${id}`, { body, ...options });
  }

  /**
   * List project secrets. Supports filtering by creation time.
   */
  list(query?: SecretListParams, options?: Core.RequestOptions): Core.APIPromise<SecretListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<SecretListResponse>;
  list(
    query: SecretListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<SecretListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/secrets', { query, ...options });
  }

  /**
   * Delete Secret
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/secrets/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get Secrets Keypair
   */
  getPublicKey(options?: Core.RequestOptions): Core.APIPromise<SecretsKeypair> {
    return this._client.get('/v1/secrets/keypair', options);
  }
}

export interface Secret {
  /**
   * Unique identifier of the secret.
   */
  id: string;

  /**
   * The name the secret value is stored under.
   */
  secretKey: string;
}

export interface SecretsKeypair {
  /**
   * Identifier of the keypair the public key was minted from. Pass this back when
   * creating a secret so the ciphertext records which keypair sealed it, which keeps
   * decryption correct across keypair rotation.
   */
  id: string;

  /**
   * The project's HPKE public encryption key, base64-encoded. Encrypt secret values
   * with this key before creating a secret.
   */
  publicKey: string;
}

/**
 * A page of secrets.
 */
export interface SecretListResponse {
  /**
   * The page of matching secrets.
   */
  data: Array<Secret>;

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

export interface SecretCreateParams {
  /**
   * The `id` returned by GET /v1/secrets/keypair, identifying the keypair whose
   * public key encrypted the value. Recorded with the secret so decryption stays
   * correct across keypair rotation.
   */
  keypairId: string;

  /**
   * The secret value encrypted with HPKE. In order to seal the secret value before
   * sending, get the project's public key from GET /v1/secrets/keypair. Decode the
   * publicKey using base64 into the raw 32-byte public key. Then, use HPKE Base mode
   * (RFC 9180) with the following algorithm suite: DHKEM(X25519, HKDF-SHA256),
   * HKDF-SHA256, and AES-256-GCM. Set both info and additional authenticated data
   * (AAD) to an empty byte string. Then, create a new sender context using the
   * public key and these settings, and encrypt the secret value as one message. Put
   * the 32-byte encapsulated key before the ciphertext and keep the authentication
   * tag at the end of the ciphertext. Encode the combined bytes with standard
   * base64. Send the result as sealedSecretValue: base64(enc || ciphertext)
   */
  sealedSecretValue: string;

  /**
   * The name to store the secret value under.
   */
  secretKey: string;
}

export interface SecretUpdateParams {
  /**
   * The `id` returned by GET /v1/secrets/keypair, identifying the keypair whose
   * public key encrypted the value. Recorded with the secret so decryption stays
   * correct across keypair rotation.
   */
  keypairId: string;

  /**
   * The new secret value encrypted with HPKE. In order to seal the secret value
   * before sending, get the project's public key from GET /v1/secrets/keypair.
   * Decode the publicKey using base64 into the raw 32-byte public key. Then, use
   * HPKE Base mode (RFC 9180) with the following algorithm suite: DHKEM(X25519,
   * HKDF-SHA256), HKDF-SHA256, and AES-256-GCM. Set both info and additional
   * authenticated data (AAD) to an empty byte string. Then, create a new sender
   * context using the public key and these settings, and encrypt the secret value as
   * one message. Put the 32-byte encapsulated key before the ciphertext and keep the
   * authentication tag at the end of the ciphertext. Encode the combined bytes with
   * standard base64. Send the result as sealedSecretValue: base64(enc || ciphertext)
   */
  sealedSecretValue: string;
}

export interface SecretListParams {
  /**
   * Pagination cursor. Pass the nextCursor from the previous response to fetch the
   * next page. Omit to start from the first page.
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

export declare namespace Secrets {
  export {
    type Secret as Secret,
    type SecretsKeypair as SecretsKeypair,
    type SecretListResponse as SecretListResponse,
    type SecretCreateParams as SecretCreateParams,
    type SecretUpdateParams as SecretUpdateParams,
    type SecretListParams as SecretListParams,
  };
}
