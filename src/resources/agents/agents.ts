// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as RunsAPI from './runs';
import {
  RunCreateParams,
  RunCreateResponse,
  RunListMessagesParams,
  RunListMessagesResponse,
  RunListParams,
  RunListResponse,
  RunRetrieveResponse,
  Runs,
} from './runs';

export class Agents extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);

  /**
   * Create a reusable agent. An agent defines a `systemPrompt` and `resultSchema`
   * that guide its behavior for every run. Only `name` is required; an agent created
   * with no `systemPrompt` behaves like an unconfigured run.
   */
  create(body: AgentCreateParams, options?: Core.RequestOptions): Core.APIPromise<AgentCreateResponse> {
    return this._client.post('/v1/agents', { body, ...options });
  }

  /**
   * Retrieve an agent by ID.
   */
  retrieve(agentId: string, options?: Core.RequestOptions): Core.APIPromise<AgentRetrieveResponse> {
    return this._client.get(`/v1/agents/${agentId}`, options);
  }

  /**
   * Update an existing agent. Only the fields provided in the body are modified;
   * omitted fields are left unchanged.
   */
  update(
    agentId: string,
    body?: AgentUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentUpdateResponse>;
  update(agentId: string, options?: Core.RequestOptions): Core.APIPromise<AgentUpdateResponse>;
  update(
    agentId: string,
    body: AgentUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentUpdateResponse> {
    if (isRequestOptions(body)) {
      return this.update(agentId, {}, body);
    }
    return this._client.patch(`/v1/agents/${agentId}`, { body, ...options });
  }

  /**
   * List agents across your account. Supports filtering by creation time.
   */
  list(query?: AgentListParams, options?: Core.RequestOptions): Core.APIPromise<AgentListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<AgentListResponse>;
  list(
    query: AgentListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/agents', { query, ...options });
  }

  /**
   * Delete an agent. Runs that already referenced this agent are unaffected.
   */
  delete(agentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/agents/${agentId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * A reusable agent. Referenced by `agentId` to apply a system prompt to every run
 * that uses the agent.
 */
export interface AgentCreateResponse {
  /**
   * Unique identifier for the agent. Use this value as `agentId` when creating an
   * agent run.
   */
  agentId: string;

  createdAt: string;

  /**
   * Human-readable name for the agent. Used to identify the agent in the dashboard
   * and API responses.
   */
  name: string;

  updatedAt: string;

  /**
   * [JSON Schema](https://json-schema.org/specification) that runs referencing this
   * agent will aim to conform their `result` to. Can be overridden per run by
   * passing `resultSchema` on the run request.
   */
  resultSchema?: { [key: string]: unknown };

  /**
   * System prompt applied to every run that uses this agent.
   */
  systemPrompt?: string;
}

/**
 * A reusable agent. Referenced by `agentId` to apply a system prompt to every run
 * that uses the agent.
 */
export interface AgentRetrieveResponse {
  /**
   * Unique identifier for the agent. Use this value as `agentId` when creating an
   * agent run.
   */
  agentId: string;

  createdAt: string;

  /**
   * Human-readable name for the agent. Used to identify the agent in the dashboard
   * and API responses.
   */
  name: string;

  updatedAt: string;

  /**
   * [JSON Schema](https://json-schema.org/specification) that runs referencing this
   * agent will aim to conform their `result` to. Can be overridden per run by
   * passing `resultSchema` on the run request.
   */
  resultSchema?: { [key: string]: unknown };

  /**
   * System prompt applied to every run that uses this agent.
   */
  systemPrompt?: string;
}

/**
 * A reusable agent. Referenced by `agentId` to apply a system prompt to every run
 * that uses the agent.
 */
export interface AgentUpdateResponse {
  /**
   * Unique identifier for the agent. Use this value as `agentId` when creating an
   * agent run.
   */
  agentId: string;

  createdAt: string;

  /**
   * Human-readable name for the agent. Used to identify the agent in the dashboard
   * and API responses.
   */
  name: string;

  updatedAt: string;

  /**
   * [JSON Schema](https://json-schema.org/specification) that runs referencing this
   * agent will aim to conform their `result` to. Can be overridden per run by
   * passing `resultSchema` on the run request.
   */
  resultSchema?: { [key: string]: unknown };

  /**
   * System prompt applied to every run that uses this agent.
   */
  systemPrompt?: string;
}

/**
 * A page of agents.
 */
export interface AgentListResponse {
  /**
   * The page of matching agents.
   */
  data: Array<AgentListResponse.Data>;

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

export namespace AgentListResponse {
  /**
   * A reusable agent. Referenced by `agentId` to apply a system prompt to every run
   * that uses the agent.
   */
  export interface Data {
    /**
     * Unique identifier for the agent. Use this value as `agentId` when creating an
     * agent run.
     */
    agentId: string;

    createdAt: string;

    /**
     * Human-readable name for the agent. Used to identify the agent in the dashboard
     * and API responses.
     */
    name: string;

    updatedAt: string;

    /**
     * [JSON Schema](https://json-schema.org/specification) that runs referencing this
     * agent will aim to conform their `result` to. Can be overridden per run by
     * passing `resultSchema` on the run request.
     */
    resultSchema?: { [key: string]: unknown };

    /**
     * System prompt applied to every run that uses this agent.
     */
    systemPrompt?: string;
  }
}

export interface AgentCreateParams {
  /**
   * Human-readable name for the agent. Used to identify the agent in the dashboard
   * and API responses.
   */
  name: string;

  /**
   * An optional [JSON Schema](https://json-schema.org/specification) object. If
   * provided, runs that reference this agent will aim to return a `result` that
   * conforms to this schema when they complete. Can be overridden per run by passing
   * `resultSchema` on the run request.
   */
  resultSchema?: { [key: string]: unknown };

  /**
   * System prompt that steers the agent's behavior on every run that uses this
   * agent.
   */
  systemPrompt?: string;
}

export interface AgentUpdateParams {
  /**
   * Human-readable name for the agent. Used to identify the agent in the dashboard
   * and API responses.
   */
  name?: string;

  /**
   * An optional [JSON Schema](https://json-schema.org/specification) object. If
   * provided, runs that reference this agent will aim to return a `result` that
   * conforms to this schema when they complete. Can be overridden per run by passing
   * `resultSchema` on the run request.
   */
  resultSchema?: { [key: string]: unknown };

  /**
   * New system prompt that steers the agent's behavior on every run that uses this
   * agent.
   */
  systemPrompt?: string;
}

export interface AgentListParams {
  /**
   * Pagination cursor. Pass the nextCursor from the previous response to fetch the
   * next page. Omit to start from the first page.
   */
  cursor?: string;

  /**
   * Only return agents created on or before this timestamp (inclusive). ISO 8601 /
   * RFC 3339, e.g. 2026-01-20T00:00:00Z.
   */
  endAt?: string;

  /**
   * Maximum number of results to return.
   */
  limit?: number;

  /**
   * Only return agents created on or after this timestamp (inclusive). ISO 8601 /
   * RFC 3339, e.g. 2026-01-19T00:00:00Z.
   */
  startAt?: string;
}

Agents.Runs = Runs;

export declare namespace Agents {
  export {
    type AgentCreateResponse as AgentCreateResponse,
    type AgentRetrieveResponse as AgentRetrieveResponse,
    type AgentUpdateResponse as AgentUpdateResponse,
    type AgentListResponse as AgentListResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
  };

  export {
    Runs as Runs,
    type RunCreateResponse as RunCreateResponse,
    type RunRetrieveResponse as RunRetrieveResponse,
    type RunListResponse as RunListResponse,
    type RunListMessagesResponse as RunListMessagesResponse,
    type RunCreateParams as RunCreateParams,
    type RunListParams as RunListParams,
    type RunListMessagesParams as RunListMessagesParams,
  };
}
