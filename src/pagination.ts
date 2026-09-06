// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { AbstractPage, Response, APIClient, FinalRequestOptions, PageInfo } from './core';

export interface DownloadsPageResponse<Item> {
  downloads: Array<Item>;

  total: number;

  limit: number;

  offset: number;
}

export interface DownloadsPageParams {
  /**
   * Maximum number of results to return (1–100, default 20).
   */
  limit?: number;

  /**
   * Number of results to skip (default 0).
   */
  offset?: number;
}

export class DownloadsPage<Item> extends AbstractPage<Item> implements DownloadsPageResponse<Item> {
  downloads: Array<Item>;

  total: number;

  limit: number;

  offset: number;

  constructor(
    client: APIClient,
    response: Response,
    body: DownloadsPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.downloads = body.downloads || [];
    this.total = body.total || 0;
    this.limit = body.limit || 0;
    this.offset = body.offset || 0;
  }

  getPaginatedItems(): Item[] {
    return this.downloads ?? [];
  }

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<DownloadsPageParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
    const offset = this.offset ?? 0;
    const length = this.getPaginatedItems().length;
    const currentCount = offset + length;

    const totalCount = this.total;
    if (!totalCount) {
      return null;
    }

    if (currentCount < totalCount) {
      return { params: { offset: currentCount } };
    }

    return null;
  }
}
