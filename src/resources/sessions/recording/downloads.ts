// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';

export class Downloads extends APIResource {
  /**
   * Requests one downloadable MP4 per recorded page of a session. Assembly runs
   * asynchronously and every page returns as `PENDING`. Re-posting re-enqueues all
   * pages and retries any that failed. Poll the GET endpoint for per-page status
   * and, on standard (non-BYOS) projects, download URLs.
   */
  create(id: string, options?: Core.RequestOptions): Core.APIPromise<DownloadCreateResponse> {
    return this._client.post(`/v1/sessions/${id}/recording/downloads`, options);
  }

  /**
   * Returns the per-page download status for a session, with a short-lived signed
   * URL for each completed page on standard (non-BYOS) projects.
   */
  list(id: string, options?: Core.RequestOptions): Core.APIPromise<DownloadListResponse> {
    return this._client.get(`/v1/sessions/${id}/recording/downloads`, options);
  }
}

export interface RecordingDownload {
  /**
   * Recorded page (tab) within the session, e.g. "0", "1".
   */
  pageId: string;

  /**
   * Per-page MP4 assembly state. `NOT_REQUESTED`: no download has been requested for
   * the session yet. `PENDING`: assembly is enqueued or in progress. `COMPLETED`:
   * the MP4 is ready. `FAILED`: assembly failed; POST again to retry.
   */
  status: 'NOT_REQUESTED' | 'PENDING' | 'COMPLETED' | 'FAILED';

  /**
   * When the MP4 was created. Present only when COMPLETED on a standard (non-BYOS)
   * project.
   */
  completedAt?: string;

  /**
   * Short-lived signed CDN URL, re-minted each GET. Present only when COMPLETED on a
   * standard (non-BYOS) project.
   */
  downloadUrl?: string;
}

export interface DownloadCreateResponse {
  downloads: Array<RecordingDownload>;
}

export interface DownloadListResponse {
  downloads: Array<RecordingDownload>;
}

export declare namespace Downloads {
  export {
    type RecordingDownload as RecordingDownload,
    type DownloadCreateResponse as DownloadCreateResponse,
    type DownloadListResponse as DownloadListResponse,
  };
}
