// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { type Response } from '../../_shims/index';

export class Replays extends APIResource {
  /**
   * Returns page metadata for a session replay, including timing information and the
   * URL of each page's HLS playlist.
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<ReplayRetrieveResponse> {
    return this._client.get(`/v1/sessions/${id}/replays`, options);
  }

  /**
   * Returns an HLS VOD media playlist (.m3u8) for a specific page of a session
   * replay.
   */
  retrievePage(id: string, pageId: string, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.get(`/v1/sessions/${id}/replays/${pageId}`, {
      ...options,
      headers: { Accept: 'application/vnd.apple.mpegurl', ...options?.headers },
      __binaryResponse: true,
    });
  }
}

export interface ReplayRetrieveResponse {
  pageCount: number;

  pages: Array<ReplayRetrieveResponse.Page>;
}

export namespace ReplayRetrieveResponse {
  export interface Page {
    endTimeMs: number;

    pageId: string;

    startTimeMs: number;

    url: string;
  }
}

export declare namespace Replays {
  export { type ReplayRetrieveResponse as ReplayRetrieveResponse };
}
