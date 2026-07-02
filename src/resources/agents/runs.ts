// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class Runs extends APIResource {
  /**
   * Run a browser agent to complete the `task` by using web search and browser
   * tooling. Optionally pass `agentId` to run a
   * [custom agent](/reference/api/create-an-agent) you've created.
   */
  create(body: RunCreateParams, options?: Core.RequestOptions): Core.APIPromise<RunCreateResponse> {
    return this._client.post('/v1/agents/runs', { body, ...options });
  }

  /**
   * Retrieve the current status and details of a run, including its result and
   * associated session information. To fetch the run's messages, use
   * [List Run Messages](/reference/api/list-run-messages).
   */
  retrieve(runId: string, options?: Core.RequestOptions): Core.APIPromise<RunRetrieveResponse> {
    return this._client.get(`/v1/agents/runs/${runId}`, options);
  }

  /**
   * List runs across your account. Supports filtering by status, by the agent they
   * reference, and by creation time.
   */
  list(query?: RunListParams, options?: Core.RequestOptions): Core.APIPromise<RunListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<RunListResponse>;
  list(
    query: RunListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<RunListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/agents/runs', { query, ...options });
  }

  /**
   * Returns a paginated list of messages produced by a run, in chronological order,
   * with the oldest messages first.
   *
   * Messages conform to the
   * [AI SDK UIMessage format](https://ai-sdk.dev/docs/reference/ai-sdk-core/ui-message).
   */
  listMessages(
    runId: string,
    query?: RunListMessagesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<RunListMessagesResponse>;
  listMessages(runId: string, options?: Core.RequestOptions): Core.APIPromise<RunListMessagesResponse>;
  listMessages(
    runId: string,
    query: RunListMessagesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<RunListMessagesResponse> {
    if (isRequestOptions(query)) {
      return this.listMessages(runId, {}, query);
    }
    return this._client.get(`/v1/agents/runs/${runId}/messages`, { query, ...options });
  }
}

/**
 * One execution of an agent against a task. Created in `pending` and transitioned
 * through `running` → `completed`/`failed` by the runner.
 */
export interface RunCreateResponse {
  createdAt: string;

  /**
   * Unique identifier for the run.
   */
  runId: string;

  /**
   * Current status of the run.
   *
   * - `PENDING` - agent will run soon
   * - `RUNNING` - agent is currently running
   * - `COMPLETED` - agent has finished running
   * - `FAILED` - agent has failed the run
   * - `STOPPED` - run was stopped by the user
   * - `TIMED_OUT` - run exceeded maximum time
   */
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'STOPPED' | 'TIMED_OUT';

  /**
   * The original task description.
   */
  task: string;

  updatedAt: string;

  /**
   * The ID of the agent applied to this run, if any. Omitted for ad-hoc runs.
   */
  agentId?: string;

  cause?: RunCreateResponse.Cause;

  endedAt?: string;

  /**
   * The agent's structured result for the run. Only present when the run has
   * finished and output is available. The result conforms to the provided
   * [JSON Schema](https://json-schema.org/specification) when one is set.
   */
  result?: { [key: string]: unknown };

  /**
   * Per-run [JSON Schema](https://json-schema.org/specification) override for the
   * result shape. When unset, the agent's default `resultSchema` applies.
   */
  resultSchema?: { [key: string]: unknown };

  /**
   * External sandbox identifier assigned by the runner. Optional.
   */
  sandboxId?: string;

  /**
   * The Browserbase session ID powering this run.
   */
  sessionId?: string;

  startedAt?: string;
}

export namespace RunCreateResponse {
  export interface Cause {
    /**
     * Structured failure code (e.g., RUNNER_HEARTBEAT_LOST).
     */
    code: string;

    /**
     * Human-readable failure detail.
     */
    message?: string;
  }
}

/**
 * One execution of an agent against a task. Created in `pending` and transitioned
 * through `running` → `completed`/`failed` by the runner.
 */
export interface RunRetrieveResponse {
  createdAt: string;

  /**
   * Unique identifier for the run.
   */
  runId: string;

  /**
   * Current status of the run.
   *
   * - `PENDING` - agent will run soon
   * - `RUNNING` - agent is currently running
   * - `COMPLETED` - agent has finished running
   * - `FAILED` - agent has failed the run
   * - `STOPPED` - run was stopped by the user
   * - `TIMED_OUT` - run exceeded maximum time
   */
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'STOPPED' | 'TIMED_OUT';

  /**
   * The original task description.
   */
  task: string;

  updatedAt: string;

  /**
   * The ID of the agent applied to this run, if any. Omitted for ad-hoc runs.
   */
  agentId?: string;

  cause?: RunRetrieveResponse.Cause;

  endedAt?: string;

  /**
   * The agent's structured result for the run. Only present when the run has
   * finished and output is available. The result conforms to the provided
   * [JSON Schema](https://json-schema.org/specification) when one is set.
   */
  result?: { [key: string]: unknown };

  /**
   * Per-run [JSON Schema](https://json-schema.org/specification) override for the
   * result shape. When unset, the agent's default `resultSchema` applies.
   */
  resultSchema?: { [key: string]: unknown };

  /**
   * External sandbox identifier assigned by the runner. Optional.
   */
  sandboxId?: string;

  /**
   * The Browserbase session ID powering this run.
   */
  sessionId?: string;

  startedAt?: string;
}

export namespace RunRetrieveResponse {
  export interface Cause {
    /**
     * Structured failure code (e.g., RUNNER_HEARTBEAT_LOST).
     */
    code: string;

    /**
     * Human-readable failure detail.
     */
    message?: string;
  }
}

/**
 * A page of agent runs.
 */
export interface RunListResponse {
  /**
   * The page of matching agent runs.
   */
  data: Array<RunListResponse.Data>;

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

export namespace RunListResponse {
  /**
   * One execution of an agent against a task. Created in `pending` and transitioned
   * through `running` → `completed`/`failed` by the runner.
   */
  export interface Data {
    createdAt: string;

    /**
     * Unique identifier for the run.
     */
    runId: string;

    /**
     * Current status of the run.
     *
     * - `PENDING` - agent will run soon
     * - `RUNNING` - agent is currently running
     * - `COMPLETED` - agent has finished running
     * - `FAILED` - agent has failed the run
     * - `STOPPED` - run was stopped by the user
     * - `TIMED_OUT` - run exceeded maximum time
     */
    status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'STOPPED' | 'TIMED_OUT';

    /**
     * The original task description.
     */
    task: string;

    updatedAt: string;

    /**
     * The ID of the agent applied to this run, if any. Omitted for ad-hoc runs.
     */
    agentId?: string;

    cause?: Data.Cause;

    endedAt?: string;

    /**
     * The agent's structured result for the run. Only present when the run has
     * finished and output is available. The result conforms to the provided
     * [JSON Schema](https://json-schema.org/specification) when one is set.
     */
    result?: { [key: string]: unknown };

    /**
     * Per-run [JSON Schema](https://json-schema.org/specification) override for the
     * result shape. When unset, the agent's default `resultSchema` applies.
     */
    resultSchema?: { [key: string]: unknown };

    /**
     * External sandbox identifier assigned by the runner. Optional.
     */
    sandboxId?: string;

    /**
     * The Browserbase session ID powering this run.
     */
    sessionId?: string;

    startedAt?: string;
  }

  export namespace Data {
    export interface Cause {
      /**
       * Structured failure code (e.g., RUNNER_HEARTBEAT_LOST).
       */
      code: string;

      /**
       * Human-readable failure detail.
       */
      message?: string;
    }
  }
}

export interface RunListMessagesResponse {
  /**
   * The page of messages, in chronological order, with the oldest messages first.
   */
  data: Array<RunListMessagesResponse.Data>;

  /**
   * The `id` of the last message in `data`. Pass it back as `since` on the next
   * request to continue paging, or to poll for new messages. `null` only when the
   * run has no messages yet; in that case, omit `since` and retry.
   */
  nextSince: string | null;
}

export namespace RunListMessagesResponse {
  export interface Data {
    id: string;

    createdAt: string;

    /**
     * An AI SDK response message (assistant or tool).
     */
    message: Data.Message;
  }

  export namespace Data {
    /**
     * An AI SDK response message (assistant or tool).
     */
    export interface Message {
      /**
       * Plain string (assistant text) or an array of typed parts.
       */
      content: string | Array<Message.UnionMember1>;

      role: 'assistant' | 'tool';

      [k: string]: unknown;
    }

    export namespace Message {
      export interface UnionMember1 {
        /**
         * text | reasoning | file | tool-call | tool-result
         */
        type: string;

        data?: string;

        input?: unknown;

        mediaType?: string;

        output?: unknown;

        text?: string;

        toolCallId?: string;

        toolName?: string;

        [k: string]: unknown;
      }
    }
  }
}

export interface RunCreateParams {
  /**
   * A natural language description of the task the agent should accomplish.
   */
  task: string;

  /**
   * Optionally run a specific [custom agent](/reference/api/create-an-agent) you've
   * created by ID. The run will use the agent's `systemPrompt` and `resultSchema`
   * unless overridden.
   */
  agentId?: string;

  /**
   * Browser configuration for the agent's session. When omitted, runner defaults
   * apply.
   */
  browserSettings?: RunCreateParams.BrowserSettings;

  /**
   * An optional [JSON Schema](https://json-schema.org/specification) object. If
   * provided, the agent will aim to return a `result` that conforms to this schema
   * when the run completes. Overrides the referenced agent's default `resultSchema`
   * for this run only.
   */
  resultSchema?: { [key: string]: unknown };

  /**
   * Optional named variables the agent can reference as placeholders, i.e.
   * `%variable%`. Each entry pairs a `value` the placeholder resolves to with an
   * optional `description` that hints to the agent when it should be used. Values
   * are not persisted.
   */
  variables?: { [key: string]: RunCreateParams.Variables };
}

export namespace RunCreateParams {
  /**
   * Browser configuration for the agent's session. When omitted, runner defaults
   * apply.
   */
  export interface BrowserSettings {
    context?: BrowserSettings.Context;

    /**
     * Set true to route the agent's browser session through the default proxy.
     */
    proxies?: boolean;

    /**
     * Set true to enable Browserbase Verified for the session.
     */
    verified?: boolean;
  }

  export namespace BrowserSettings {
    export interface Context {
      /**
       * The Context ID.
       */
      id: string;

      /**
       * Whether to persist the context after browsing. Defaults to false.
       */
      persist?: boolean;
    }
  }

  export interface Variables {
    /**
     * The value the placeholder resolves to when the agent uses it.
     */
    value: string;

    /**
     * Optional hint to the agent describing what this variable represents and when to
     * use it.
     */
    description?: string;
  }
}

export interface RunListParams {
  /**
   * Only return runs that reference this agent ID.
   */
  agentId?: string;

  /**
   * Pagination cursor. Pass the nextCursor from the previous response to fetch the
   * next page. Omit to start from the first page.
   */
  cursor?: string;

  /**
   * Only return runs created on or before this timestamp (inclusive). ISO 8601 / RFC
   * 3339, e.g. 2026-01-20T00:00:00Z.
   */
  endAt?: string;

  /**
   * Maximum number of results to return.
   */
  limit?: number;

  /**
   * Only return runs created on or after this timestamp (inclusive). ISO 8601 / RFC
   * 3339, e.g. 2026-01-19T00:00:00Z.
   */
  startAt?: string;

  /**
   * Current status of the run.
   *
   * - `PENDING` - agent will run soon
   * - `RUNNING` - agent is currently running
   * - `COMPLETED` - agent has finished running
   * - `FAILED` - agent has failed the run
   * - `STOPPED` - run was stopped by the user
   * - `TIMED_OUT` - run exceeded maximum time
   */
  status?: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'STOPPED' | 'TIMED_OUT';
}

export interface RunListMessagesParams {
  /**
   * Return every message after `since` in one response, ignoring `limit`.
   */
  all?: boolean;

  /**
   * Maximum number of messages to return.
   */
  limit?: number;

  /**
   * The `id` of the last message you've already received. The response will contain
   * messages produced after that one, in chronological order. Omit on the first
   * call. Pass the previous response's `nextSince` value to continue paging or to
   * poll for new messages.
   */
  since?: string;
}

export declare namespace Runs {
  export {
    type RunCreateResponse as RunCreateResponse,
    type RunRetrieveResponse as RunRetrieveResponse,
    type RunListResponse as RunListResponse,
    type RunListMessagesResponse as RunListMessagesResponse,
    type RunCreateParams as RunCreateParams,
    type RunListParams as RunListParams,
    type RunListMessagesParams as RunListMessagesParams,
  };
}
