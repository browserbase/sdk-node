// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as DownloadsAPI from './downloads';
import { DownloadCreateResponse, DownloadListResponse, Downloads, RecordingDownload } from './downloads';

export class Recording extends APIResource {
  downloads: DownloadsAPI.Downloads = new DownloadsAPI.Downloads(this._client);

  /**
   * Session Recording
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<RecordingRetrieveResponse> {
    return this._client.get(`/v1/sessions/${id}/recording`, options);
  }
}

export interface SessionRecording {
  /**
   * See
   * [rrweb documentation](https://github.com/rrweb-io/rrweb/blob/master/docs/recipes/dive-into-event.md).
   */
  data: { [key: string]: unknown };

  sessionId: string;

  /**
   * milliseconds that have elapsed since the UNIX epoch
   */
  timestamp: number;

  type: number;
}

export type RecordingRetrieveResponse = Array<SessionRecording>;

Recording.Downloads = Downloads;

export declare namespace Recording {
  export {
    type SessionRecording as SessionRecording,
    type RecordingRetrieveResponse as RecordingRetrieveResponse,
  };

  export {
    Downloads as Downloads,
    type RecordingDownload as RecordingDownload,
    type DownloadCreateResponse as DownloadCreateResponse,
    type DownloadListResponse as DownloadListResponse,
  };
}
