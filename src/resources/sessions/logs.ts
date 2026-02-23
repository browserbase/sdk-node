// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Logs extends APIResource {
  /**
   * Session Logs
   */
  list(id: string, options?: Core.RequestOptions): Core.APIPromise<LogListResponse> {
    return this._client.get(`/v1/sessions/${id}/logs`, options);
  }
}

export type LogListResponse = Array<LogListResponse.LogListResponseItem>;

export namespace LogListResponse {
  export interface LogListResponseItem {
    method: string;

    pageId: number;

    sessionId: string;

    frameId?: string;

    loaderId?: string;

    request?: LogListResponseItem.Request;

    response?: LogListResponseItem.Response;

    /**
     * milliseconds that have elapsed since the UNIX epoch
     */
    timestamp?: number;
  }

  export namespace LogListResponseItem {
    export interface Request {
      params: { [key: string]: unknown };

      rawBody: string;

      /**
       * milliseconds that have elapsed since the UNIX epoch
       */
      timestamp?: number;
    }

    export interface Response {
      rawBody: string;

      result: { [key: string]: unknown };

      /**
       * milliseconds that have elapsed since the UNIX epoch
       */
      timestamp?: number;
    }
  }
}

export declare namespace Logs {
  export { type LogListResponse as LogListResponse };
}
