// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Search extends APIResource {
  /**
   * Perform a web search and return structured results.
   */
  web(body: SearchWebParams, options?: Core.RequestOptions): Core.APIPromise<SearchWebResponse> {
    return this._client.post('/v1/search', { body, ...options });
  }
}

export interface SearchWebResponse {
  /**
   * The search query that was executed
   */
  query: string;

  /**
   * Unique identifier for the request
   */
  requestId: string;

  /**
   * List of search results
   */
  results: Array<SearchWebResponse.Result>;
}

export namespace SearchWebResponse {
  export interface Result {
    /**
     * Unique identifier for the result
     */
    id: string;

    /**
     * The title of the search result
     */
    title: string;

    /**
     * The URL of the search result
     */
    url: string;

    /**
     * Author of the content if available
     */
    author?: string;

    /**
     * Passages from the page most relevant to the query. Only set when the request
     * asks for excerpts.
     */
    excerpts?: Array<string>;

    /**
     * Favicon URL
     */
    favicon?: string;

    /**
     * Image URL if available
     */
    image?: string;

    /**
     * Publication date in RFC 3339 format
     */
    publishedDate?: string;
  }
}

export type SearchWebParams = SearchWebParams.Variant0 | SearchWebParams.Variant1 | SearchWebParams.Variant2;

export declare namespace SearchWebParams {
  export interface Variant0 {
    /**
     * Search provider to serve this request. Defaults to `parallel`, which uses
     * `advanced` mode unless `mode` is set.
     */
    provider: 'parallel';

    /**
     * The search query string
     */
    query: string;

    /**
     * Return the passages of each page most relevant to the query. Omit to return no
     * excerpts.
     */
    excerpts?: Variant0.Excerpts;

    /**
     * Refetch a page when the cached copy is older than this many hours, from 1
     * to 720. 0 always fetches fresh content and -1 uses only cached content (exa
     * provider only). Omit to use the provider default. This is a refresh threshold,
     * not a strict maximum age: a provider can return an older cached copy when a live
     * fetch fails.
     */
    maxAgeHours?: number;

    /**
     * The search mode used by the underlying provider. Defaults to `advanced` for
     * `parallel` and `fast` for `exa`. See the
     * [Search docs](https://docs.browserbase.com/platform/search/overview) for the
     * available modes.
     */
    mode?: 'fast' | 'advanced';

    /**
     * Number of results to return (1-25)
     */
    numResults?: number;

    /**
     * The task intent and soft preferences for the search, in natural language. Adds
     * context to query without replacing it.
     */
    objective?: string;
  }

  export namespace Variant0 {
    /**
     * Return the passages of each page most relevant to the query. Omit to return no
     * excerpts.
     */
    export interface Excerpts {
      /**
       * Maximum excerpt characters per result. Omit to use the provider default.
       */
      maxCharacters?: number;
    }
  }

  export interface Variant1 {
    /**
     * Search provider to serve this request. Defaults to `parallel`, which uses
     * `advanced` mode unless `mode` is set.
     */
    provider: 'exa';

    /**
     * The search query string
     */
    query: string;

    /**
     * Return the passages of each page most relevant to the query. Omit to return no
     * excerpts.
     */
    excerpts?: Variant1.Excerpts;

    /**
     * Refetch a page when the cached copy is older than this many hours, from 1
     * to 720. 0 always fetches fresh content and -1 uses only cached content (exa
     * provider only). Omit to use the provider default. This is a refresh threshold,
     * not a strict maximum age: a provider can return an older cached copy when a live
     * fetch fails.
     */
    maxAgeHours?: number;

    /**
     * The search mode used by the underlying provider. Defaults to `advanced` for
     * `parallel` and `fast` for `exa`. See the
     * [Search docs](https://docs.browserbase.com/platform/search/overview) for the
     * available modes.
     */
    mode?: 'fast' | 'deep-lite' | 'deep';

    /**
     * Number of results to return (1-25)
     */
    numResults?: number;

    /**
     * The task intent and soft preferences for the search, in natural language. Adds
     * context to query without replacing it.
     */
    objective?: string;
  }

  export namespace Variant1 {
    /**
     * Return the passages of each page most relevant to the query. Omit to return no
     * excerpts.
     */
    export interface Excerpts {
      /**
       * Maximum excerpt characters per result. Omit to use the provider default.
       */
      maxCharacters?: number;
    }
  }

  export interface Variant2 {
    /**
     * The search query string
     */
    query: string;

    /**
     * Return the passages of each page most relevant to the query. Omit to return no
     * excerpts.
     */
    excerpts?: Variant2.Excerpts;

    /**
     * Refetch a page when the cached copy is older than this many hours, from 1
     * to 720. 0 always fetches fresh content and -1 uses only cached content (exa
     * provider only). Omit to use the provider default. This is a refresh threshold,
     * not a strict maximum age: a provider can return an older cached copy when a live
     * fetch fails.
     */
    maxAgeHours?: number;

    /**
     * Number of results to return (1-25)
     */
    numResults?: number;

    /**
     * The task intent and soft preferences for the search, in natural language. Adds
     * context to query without replacing it.
     */
    objective?: string;
  }

  export namespace Variant2 {
    /**
     * Return the passages of each page most relevant to the query. Omit to return no
     * excerpts.
     */
    export interface Excerpts {
      /**
       * Maximum excerpt characters per result. Omit to use the provider default.
       */
      maxCharacters?: number;
    }
  }
}

export declare namespace Search {
  export { type SearchWebResponse as SearchWebResponse, type SearchWebParams as SearchWebParams };
}
