// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import { DownloadsPage, type DownloadsPageParams } from '../pagination';
import { type Response } from '../_shims/index';

export class Downloads extends APIResource {
  /**
   * Get download metadata (Accept: application/json) or file content (Accept:
   * application/octet-stream).
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Download> {
    return this._client.get(`/v1/downloads/${id}`, options);
  }

  /**
   * List all downloads for a session with optional filtering and pagination.
   */
  list(
    query: DownloadListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<DownloadListResponsesDownloadsPage, DownloadListResponse> {
    return this._client.getAPIList('/v1/downloads', DownloadListResponsesDownloadsPage, {
      query,
      ...options,
    });
  }

  /**
   * Delete a download file from storage and mark as deleted.
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/downloads/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get download metadata (Accept: application/json) or file content (Accept:
   * application/octet-stream).
   */
  download(id: string, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.get(`/v1/downloads/${id}`, {
      ...options,
      headers: { Accept: 'application/binary', ...options?.headers },
      __binaryResponse: true,
    });
  }
}

export class DownloadListResponsesDownloadsPage extends DownloadsPage<DownloadListResponse> {}

export interface Download {
  /**
   * Unique identifier for the download.
   */
  id: string;

  /**
   * SHA256 checksum of the file.
   */
  checksum: string;

  /**
   * Timestamp when the file was downloaded.
   */
  createdAt: string;

  /**
   * The filename of the downloaded file.
   */
  filename: string;

  /**
   * The MIME type of the file.
   */
  mimeType: string;

  /**
   * The Session ID this download belongs to.
   */
  sessionId: string;

  /**
   * File size in bytes.
   */
  size: number;
}

export interface DownloadListResponse {
  /**
   * Unique identifier for the download.
   */
  id: string;

  /**
   * SHA256 checksum of the file.
   */
  checksum: string;

  /**
   * Timestamp when the file was downloaded.
   */
  createdAt: string;

  /**
   * The filename of the downloaded file.
   */
  filename: string;

  /**
   * The MIME type of the file.
   */
  mimeType: string;

  /**
   * The Session ID this download belongs to.
   */
  sessionId: string;

  /**
   * File size in bytes.
   */
  size: number;
}

export interface DownloadListParams extends DownloadsPageParams {
  /**
   * Filter downloads by session ID (required).
   */
  sessionId: string;

  /**
   * Filter downloads created on or after this timestamp.
   */
  createdAfter?: string;

  /**
   * Filter downloads created on or before this timestamp.
   */
  createdBefore?: string;

  /**
   * Filter by exact filename match.
   */
  filename?: string;

  /**
   * Maximum file size in bytes.
   */
  maxSize?: number;

  /**
   * Filter by MIME type.
   */
  mimeType?: string;

  /**
   * Minimum file size in bytes.
   */
  minSize?: number;
}

Downloads.DownloadListResponsesDownloadsPage = DownloadListResponsesDownloadsPage;

export declare namespace Downloads {
  export {
    type Download as Download,
    type DownloadListResponse as DownloadListResponse,
    DownloadListResponsesDownloadsPage as DownloadListResponsesDownloadsPage,
    type DownloadListParams as DownloadListParams,
  };
}
