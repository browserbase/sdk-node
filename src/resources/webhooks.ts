// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Webhooks extends APIResource {
  /**
   * Register an HTTPS endpoint to receive events for this project. The response
   * includes the signing secret, which is shown only here and when the secret is
   * rotated. Store it before discarding the response. An endpoint may only be
   * registered once per project.
   */
  create(body: WebhookCreateParams, options?: Core.RequestOptions): Core.APIPromise<WebhookCreateResponse> {
    return this._client.post('/v1/webhooks', { body, ...options });
  }

  /**
   * Retrieve a single webhook by ID. The signing secret is not included; it is only
   * ever returned on create and rotate.
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Webhook> {
    return this._client.get(`/v1/webhooks/${id}`, options);
  }

  /**
   * Update a webhook's endpoint URL, its subscribed event types, or both. Omitted
   * fields are left unchanged. `eventTypes` replaces the existing subscription
   * rather than adding to it. The signing secret is unaffected.
   */
  update(id: string, body: WebhookUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Webhook> {
    return this._client.patch(`/v1/webhooks/${id}`, { body, ...options });
  }

  /**
   * List the project's webhooks, newest first. Signing secrets are not included.
   * Page by passing the previous response's `nextCursor` as `cursor`; a null
   * `nextCursor` means there are no further pages.
   */
  list(query?: WebhookListParams, options?: Core.RequestOptions): Core.APIPromise<WebhookListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<WebhookListResponse>;
  list(
    query: WebhookListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/webhooks', { query, ...options });
  }

  /**
   * Delete a webhook. Deliveries stop immediately and the signing secret is retired.
   * Events that occurred before the delete are not replayed if the endpoint is
   * registered again.
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/webhooks/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Issue a new signing secret for a webhook. By default the previous secret keeps
   * verifying for 24 hours so a receiver can be updated without dropping deliveries;
   * pass `revokeImmediately` to end that window at once. The new secret is returned
   * only here.
   */
  rotateSecret(
    id: string,
    body?: WebhookRotateSecretParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookRotateSecretResponse>;
  rotateSecret(id: string, options?: Core.RequestOptions): Core.APIPromise<WebhookRotateSecretResponse>;
  rotateSecret(
    id: string,
    body: WebhookRotateSecretParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<WebhookRotateSecretResponse> {
    if (isRequestOptions(body)) {
      return this.rotateSecret(id, {}, body);
    }
    return this._client.post(`/v1/webhooks/${id}/secret`, { body, ...options });
  }
}

/**
 * A delivery endpoint for a project. Browserbase POSTs a signed event to it
 * whenever one of its subscribed event types occurs. The signing secret is
 * returned only when it is created or rotated.
 */
export interface Webhook {
  /**
   * Unique identifier for the webhook.
   */
  id: string;

  createdAt: string;

  /**
   * HTTPS URL that event deliveries are POSTed to. Must be publicly reachable.
   */
  endpoint: string;

  /**
   * Event types this webhook subscribes to. Unknown types are rejected.
   */
  eventTypes: Array<
    | 'functions.builds.running'
    | 'functions.builds.completed'
    | 'functions.builds.failed'
    | 'functions.invocations.pending'
    | 'functions.invocations.running'
    | 'functions.invocations.completed'
    | 'functions.invocations.failed'
  >;

  /**
   * The project the webhook belongs to.
   */
  projectId: string;

  updatedAt: string;
}

/**
 * The created webhook, including its signing secret.
 */
export interface WebhookCreateResponse extends Webhook {
  /**
   * HMAC-SHA256 signing secret, prefixed `whsec_`. Shown once here; store it now.
   * Use it to verify the signature on every delivery.
   */
  secret: string;
}

/**
 * A page of webhooks. Signing secrets are not included.
 */
export interface WebhookListResponse {
  /**
   * The page of webhooks, newest first.
   */
  data: Array<Webhook>;

  /**
   * The maximum number of results returned in this page.
   */
  limit: number;

  /**
   * Cursor for the next page. Pass it back as `cursor` to continue paging. null when
   * there are no more results.
   */
  nextCursor: string | null;
}

/**
 * The new signing secret. Shown once; store it now.
 */
export interface WebhookRotateSecretResponse {
  /**
   * The new signing secret, prefixed `whsec_`.
   */
  secret: string;
}

export interface WebhookCreateParams {
  /**
   * HTTPS URL that event deliveries are POSTed to. Must be publicly reachable.
   */
  endpoint: string;

  /**
   * Event types this webhook subscribes to. Unknown types are rejected.
   */
  eventTypes: Array<
    | 'functions.builds.running'
    | 'functions.builds.completed'
    | 'functions.builds.failed'
    | 'functions.invocations.pending'
    | 'functions.invocations.running'
    | 'functions.invocations.completed'
    | 'functions.invocations.failed'
  >;
}

export interface WebhookUpdateParams {
  /**
   * HTTPS URL that event deliveries are POSTed to. Must be publicly reachable.
   */
  endpoint?: string;

  /**
   * Event types this webhook subscribes to. Unknown types are rejected.
   */
  eventTypes?: Array<
    | 'functions.builds.running'
    | 'functions.builds.completed'
    | 'functions.builds.failed'
    | 'functions.invocations.pending'
    | 'functions.invocations.running'
    | 'functions.invocations.completed'
    | 'functions.invocations.failed'
  >;
}

export interface WebhookListParams {
  /**
   * Cursor from a previous response's `nextCursor`. Omit for the first page.
   */
  cursor?: string;

  /**
   * Maximum number of results to return.
   */
  limit?: number;
}

export interface WebhookRotateSecretParams {
  /**
   * Expire the old secret at once instead of honouring it for 24 hours. Use when
   * responding to a leak; deliveries signed with the old secret stop verifying
   * immediately.
   */
  revokeImmediately?: boolean;
}

export declare namespace Webhooks {
  export {
    type Webhook as Webhook,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookRotateSecretResponse as WebhookRotateSecretResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookListParams as WebhookListParams,
    type WebhookRotateSecretParams as WebhookRotateSecretParams,
  };
}
