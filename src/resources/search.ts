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

  /**
   * The search mode that served the request.
   */
  mode?: 'fast' | 'advanced' | 'deep-lite' | 'deep';

  /**
   * The search provider that served the request. Can differ from the documented
   * default when the project or the filters select another provider.
   */
  provider?: 'parallel' | 'exa';
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
     * `advanced` mode unless `mode` is set. If you omit it and set a filter that
     * `parallel` doesn't support, `exa` serves the request at `exa` pricing. The
     * response `provider` field shows which one served it.
     */
    provider: 'parallel';

    /**
     * The search query string
     */
    query: string;

    /**
     * Focus the search on a category of content. Only the `exa` provider supports this
     * filter.
     */
    category?: 'company' | 'publication' | 'news' | 'personal site' | 'financial report' | 'people';

    /**
     * Only return results published before this date-time (RFC 3339, for example
     * 2026-01-01T00:00:00Z). Only the `exa` provider supports this filter. Not
     * supported with the company or people categories.
     */
    endPublishedDate?: string;

    /**
     * Return the passages of each page most relevant to the query. Defaults to false.
     */
    excerpts?: boolean;

    /**
     * Never return results from these domains. Accepts the same entry formats as
     * includeDomains. Not supported with the people category.
     */
    excludeDomains?: Array<string>;

    /**
     * Only return results from these domains. Entries can be a hostname (example.com),
     * a hostname with a path prefix (example.com/docs), or a wildcard subdomain
     * (\*.example.com). The `parallel` provider allows one list, not both, with at
     * most 200 domains and no scheme, port, query string, or fragment.
     */
    includeDomains?: Array<string>;

    /**
     * Refetch a page when the cached copy is older than this many hours. Omit to use
     * the provider default. A provider can return an older cached copy when a live
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
     * Filter unsafe content from the results. Defaults to false. Only the `exa`
     * provider supports `true`.
     */
    moderation?: boolean;

    /**
     * Number of results to return
     */
    numResults?: number;

    /**
     * The task intent and soft preferences for the search, in natural language. Adds
     * context to query without replacing it.
     */
    objective?: string;

    /**
     * Only return results published after this date-time (RFC 3339, for example
     * 2026-01-01T00:00:00Z). The `parallel` provider rounds it up to a whole UTC day.
     * Not supported with the company or people categories.
     */
    startPublishedDate?: string;

    /**
     * Two-letter ISO 3166-1 country code of the end user. Localizes ranking without
     * restricting results to sources from that country. The `parallel` provider
     * supports only
     * [some countries](https://docs.browserbase.com/platform/search/overview#appendix-supported-countries).
     */
    userLocation?: string;
  }

  export interface Variant1 {
    /**
     * Search provider to serve this request. Defaults to `parallel`, which uses
     * `advanced` mode unless `mode` is set. If you omit it and set a filter that
     * `parallel` doesn't support, `exa` serves the request at `exa` pricing. The
     * response `provider` field shows which one served it.
     */
    provider: 'exa';

    /**
     * The search query string
     */
    query: string;

    /**
     * Focus the search on a category of content. Only the `exa` provider supports this
     * filter.
     */
    category?: 'company' | 'publication' | 'news' | 'personal site' | 'financial report' | 'people';

    /**
     * Only return results published before this date-time (RFC 3339, for example
     * 2026-01-01T00:00:00Z). Only the `exa` provider supports this filter. Not
     * supported with the company or people categories.
     */
    endPublishedDate?: string;

    /**
     * Return the passages of each page most relevant to the query. Defaults to false.
     */
    excerpts?: boolean;

    /**
     * Never return results from these domains. Accepts the same entry formats as
     * includeDomains. Not supported with the people category.
     */
    excludeDomains?: Array<string>;

    /**
     * Only return results from these domains. Entries can be a hostname (example.com),
     * a hostname with a path prefix (example.com/docs), or a wildcard subdomain
     * (\*.example.com). The `parallel` provider allows one list, not both, with at
     * most 200 domains and no scheme, port, query string, or fragment.
     */
    includeDomains?: Array<string>;

    /**
     * Refetch a page when the cached copy is older than this many hours. Omit to use
     * the provider default. A provider can return an older cached copy when a live
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
     * Filter unsafe content from the results. Defaults to false. Only the `exa`
     * provider supports `true`.
     */
    moderation?: boolean;

    /**
     * Number of results to return
     */
    numResults?: number;

    /**
     * The task intent and soft preferences for the search, in natural language. Adds
     * context to query without replacing it.
     */
    objective?: string;

    /**
     * Only return results published after this date-time (RFC 3339, for example
     * 2026-01-01T00:00:00Z). The `parallel` provider rounds it up to a whole UTC day.
     * Not supported with the company or people categories.
     */
    startPublishedDate?: string;

    /**
     * Two-letter ISO 3166-1 country code of the end user. Localizes ranking without
     * restricting results to sources from that country. The `parallel` provider
     * supports only
     * [some countries](https://docs.browserbase.com/platform/search/overview#appendix-supported-countries).
     */
    userLocation?: string;
  }

  export interface Variant2 {
    /**
     * The search query string
     */
    query: string;

    /**
     * Focus the search on a category of content. Only the `exa` provider supports this
     * filter.
     */
    category?: 'company' | 'publication' | 'news' | 'personal site' | 'financial report' | 'people';

    /**
     * Only return results published before this date-time (RFC 3339, for example
     * 2026-01-01T00:00:00Z). Only the `exa` provider supports this filter. Not
     * supported with the company or people categories.
     */
    endPublishedDate?: string;

    /**
     * Return the passages of each page most relevant to the query. Defaults to false.
     */
    excerpts?: boolean;

    /**
     * Never return results from these domains. Accepts the same entry formats as
     * includeDomains. Not supported with the people category.
     */
    excludeDomains?: Array<string>;

    /**
     * Only return results from these domains. Entries can be a hostname (example.com),
     * a hostname with a path prefix (example.com/docs), or a wildcard subdomain
     * (\*.example.com). The `parallel` provider allows one list, not both, with at
     * most 200 domains and no scheme, port, query string, or fragment.
     */
    includeDomains?: Array<string>;

    /**
     * Refetch a page when the cached copy is older than this many hours. Omit to use
     * the provider default. A provider can return an older cached copy when a live
     * fetch fails.
     */
    maxAgeHours?: number;

    /**
     * Filter unsafe content from the results. Defaults to false. Only the `exa`
     * provider supports `true`.
     */
    moderation?: boolean;

    /**
     * Number of results to return
     */
    numResults?: number;

    /**
     * The task intent and soft preferences for the search, in natural language. Adds
     * context to query without replacing it.
     */
    objective?: string;

    /**
     * Only return results published after this date-time (RFC 3339, for example
     * 2026-01-01T00:00:00Z). The `parallel` provider rounds it up to a whole UTC day.
     * Not supported with the company or people categories.
     */
    startPublishedDate?: string;

    /**
     * Two-letter ISO 3166-1 country code of the end user. Localizes ranking without
     * restricting results to sources from that country. The `parallel` provider
     * supports only
     * [some countries](https://docs.browserbase.com/platform/search/overview#appendix-supported-countries).
     */
    userLocation?: string;
  }
}

export declare namespace Search {
  export { type SearchWebResponse as SearchWebResponse, type SearchWebParams as SearchWebParams };
}
