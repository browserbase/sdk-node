// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class NavigationPolicies extends APIResource {
  /**
   * Create a navigation policy for this project. Omitted fields take the defaults:
   * enabled, block by default, block unknown domains, no category rules, and no
   * overrides. Bind the policy to a session with `browserSettings.riskPolicyId`.
   */
  create(
    body: NavigationPolicyCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NavigationPolicy> {
    return this._client.post('/v1/navigation-policies', { body, ...options });
  }

  /**
   * Retrieve a single navigation policy by ID.
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<NavigationPolicy> {
    return this._client.get(`/v1/navigation-policies/${id}`, options);
  }

  /**
   * Update a navigation policy. Omitted fields keep their values; a supplied list
   * replaces the stored list rather than adding to it. The change applies to
   * sessions that start afterwards; running sessions keep the policy they started
   * with.
   */
  update(
    id: string,
    body: NavigationPolicyUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NavigationPolicy> {
    return this._client.patch(`/v1/navigation-policies/${id}`, { body, ...options });
  }

  /**
   * List the project's navigation policies, ordered by name.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<NavigationPolicyListResponse> {
    return this._client.get('/v1/navigation-policies', options);
  }

  /**
   * Delete a navigation policy. New sessions can no longer bind to it; running
   * sessions keep the policy they started with.
   */
  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/navigation-policies/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * Rules for which domains a browser session may navigate to. Bind a policy to a
 * session with `browserSettings.riskPolicyId`; Browserbase then allows or blocks
 * each navigation by the policy's overrides, its category rules, and finally its
 * default decision. A session keeps the policy as it was when the session started:
 * edits, disables, and deletes apply to sessions that start afterwards. A policy
 * checks navigations: page loads, iframes, popups, and each redirect. It doesn't
 * check requests a page makes itself, such as scripts, images, and `fetch` calls.
 * In a session that loads a Context, pages skip their service workers so that the
 * policy checks every navigation.
 */
export interface NavigationPolicy {
  /**
   * Unique identifier for the navigation policy.
   */
  id: string;

  /**
   * Navigation categories. Browserbase blocks a domain in any blocked category, even
   * if it is also in an allowed one.
   */
  allowedCategories: Array<
    | 'adult'
    | 'ai-tools'
    | 'alcohol-tobacco'
    | 'business'
    | 'child-abuse'
    | 'communication'
    | 'dating'
    | 'drugs'
    | 'education'
    | 'entertainment'
    | 'finance'
    | 'gambling'
    | 'games'
    | 'government-military'
    | 'hacking'
    | 'hate'
    | 'health'
    | 'illegal-activity'
    | 'infrastructure'
    | 'kids'
    | 'lifestyle'
    | 'malware'
    | 'newly-registered'
    | 'news'
    | 'parked-inactive'
    | 'phishing-scams'
    | 'piracy'
    | 'proxy-anonymizer'
    | 'search-portal'
    | 'self-harm'
    | 'shopping'
    | 'social-media'
    | 'society-culture'
    | 'sports'
    | 'technology'
    | 'terrorism-extremism'
    | 'travel'
    | 'url-shortener'
    | 'violence'
    | 'weapons'
  >;

  /**
   * Navigation categories. Browserbase blocks a domain in any blocked category, even
   * if it is also in an allowed one.
   */
  blockedCategories: Array<
    | 'adult'
    | 'ai-tools'
    | 'alcohol-tobacco'
    | 'business'
    | 'child-abuse'
    | 'communication'
    | 'dating'
    | 'drugs'
    | 'education'
    | 'entertainment'
    | 'finance'
    | 'gambling'
    | 'games'
    | 'government-military'
    | 'hacking'
    | 'hate'
    | 'health'
    | 'illegal-activity'
    | 'infrastructure'
    | 'kids'
    | 'lifestyle'
    | 'malware'
    | 'newly-registered'
    | 'news'
    | 'parked-inactive'
    | 'phishing-scams'
    | 'piracy'
    | 'proxy-anonymizer'
    | 'search-portal'
    | 'self-harm'
    | 'shopping'
    | 'social-media'
    | 'society-culture'
    | 'sports'
    | 'technology'
    | 'terrorism-extremism'
    | 'travel'
    | 'url-shortener'
    | 'violence'
    | 'weapons'
  >;

  createdAt: string;

  /**
   * Decision for each of a domain's categories that has no category rule. The
   * strictest of a domain's category decisions applies, and overrides take
   * precedence.
   */
  defaultDecision: 'allow' | 'block';

  /**
   * Free-form notes about the policy.
   */
  description: string;

  /**
   * Per-host decisions that take precedence over category rules and the default.
   * Each host may appear once.
   */
  domainOverrides: Array<NavigationPolicy.DomainOverride>;

  /**
   * Whether the policy can be bound to new sessions. Running sessions keep the
   * policy they started with. A disabled policy stays editable and can be
   * re-enabled.
   */
  enabled: boolean;

  /**
   * Display name. A policy's id identifies it, not its name.
   */
  name: string;

  /**
   * The project the policy belongs to.
   */
  projectId: string;

  /**
   * Decision for a domain, or one of its categories, that Browserbase can't
   * classify. It counts as one of the domain's category decisions, so the strictest
   * still applies.
   */
  unknownDomainBehavior: 'allow' | 'block';

  updatedAt: string;
}

export namespace NavigationPolicy {
  export interface DomainOverride {
    /**
     * Decision for navigations to this host.
     */
    decision: 'allow' | 'block';

    /**
     * Host the override applies to, for example `example.com`. Matching is
     * case-insensitive and covers subdomains.
     */
    domain: string;
  }
}

/**
 * The project's navigation policies.
 */
export interface NavigationPolicyListResponse {
  /**
   * The project's navigation policies, ordered by name.
   */
  data: Array<NavigationPolicy>;
}

export interface NavigationPolicyCreateParams {
  /**
   * Display name. A policy's id identifies it, not its name.
   */
  name: string;

  /**
   * Navigation categories. Browserbase blocks a domain in any blocked category, even
   * if it is also in an allowed one.
   */
  allowedCategories?: Array<
    | 'adult'
    | 'ai-tools'
    | 'alcohol-tobacco'
    | 'business'
    | 'child-abuse'
    | 'communication'
    | 'dating'
    | 'drugs'
    | 'education'
    | 'entertainment'
    | 'finance'
    | 'gambling'
    | 'games'
    | 'government-military'
    | 'hacking'
    | 'hate'
    | 'health'
    | 'illegal-activity'
    | 'infrastructure'
    | 'kids'
    | 'lifestyle'
    | 'malware'
    | 'newly-registered'
    | 'news'
    | 'parked-inactive'
    | 'phishing-scams'
    | 'piracy'
    | 'proxy-anonymizer'
    | 'search-portal'
    | 'self-harm'
    | 'shopping'
    | 'social-media'
    | 'society-culture'
    | 'sports'
    | 'technology'
    | 'terrorism-extremism'
    | 'travel'
    | 'url-shortener'
    | 'violence'
    | 'weapons'
  >;

  /**
   * Navigation categories. Browserbase blocks a domain in any blocked category, even
   * if it is also in an allowed one.
   */
  blockedCategories?: Array<
    | 'adult'
    | 'ai-tools'
    | 'alcohol-tobacco'
    | 'business'
    | 'child-abuse'
    | 'communication'
    | 'dating'
    | 'drugs'
    | 'education'
    | 'entertainment'
    | 'finance'
    | 'gambling'
    | 'games'
    | 'government-military'
    | 'hacking'
    | 'hate'
    | 'health'
    | 'illegal-activity'
    | 'infrastructure'
    | 'kids'
    | 'lifestyle'
    | 'malware'
    | 'newly-registered'
    | 'news'
    | 'parked-inactive'
    | 'phishing-scams'
    | 'piracy'
    | 'proxy-anonymizer'
    | 'search-portal'
    | 'self-harm'
    | 'shopping'
    | 'social-media'
    | 'society-culture'
    | 'sports'
    | 'technology'
    | 'terrorism-extremism'
    | 'travel'
    | 'url-shortener'
    | 'violence'
    | 'weapons'
  >;

  /**
   * Decision for each of a domain's categories that has no category rule. The
   * strictest of a domain's category decisions applies, and overrides take
   * precedence.
   */
  defaultDecision?: 'allow' | 'block';

  /**
   * Free-form notes about the policy.
   */
  description?: string;

  /**
   * Per-host decisions that take precedence over category rules and the default.
   * Each host may appear once.
   */
  domainOverrides?: Array<NavigationPolicyCreateParams.DomainOverride>;

  /**
   * Whether the policy can be bound to new sessions. Running sessions keep the
   * policy they started with. A disabled policy stays editable and can be
   * re-enabled.
   */
  enabled?: boolean;

  /**
   * Decision for a domain, or one of its categories, that Browserbase can't
   * classify. It counts as one of the domain's category decisions, so the strictest
   * still applies.
   */
  unknownDomainBehavior?: 'allow' | 'block';
}

export namespace NavigationPolicyCreateParams {
  export interface DomainOverride {
    /**
     * Decision for navigations to this host.
     */
    decision: 'allow' | 'block';

    /**
     * Host the override applies to, for example `example.com`. Matching is
     * case-insensitive and covers subdomains.
     */
    domain: string;
  }
}

export interface NavigationPolicyUpdateParams {
  /**
   * Navigation categories. Browserbase blocks a domain in any blocked category, even
   * if it is also in an allowed one.
   */
  allowedCategories?: Array<
    | 'adult'
    | 'ai-tools'
    | 'alcohol-tobacco'
    | 'business'
    | 'child-abuse'
    | 'communication'
    | 'dating'
    | 'drugs'
    | 'education'
    | 'entertainment'
    | 'finance'
    | 'gambling'
    | 'games'
    | 'government-military'
    | 'hacking'
    | 'hate'
    | 'health'
    | 'illegal-activity'
    | 'infrastructure'
    | 'kids'
    | 'lifestyle'
    | 'malware'
    | 'newly-registered'
    | 'news'
    | 'parked-inactive'
    | 'phishing-scams'
    | 'piracy'
    | 'proxy-anonymizer'
    | 'search-portal'
    | 'self-harm'
    | 'shopping'
    | 'social-media'
    | 'society-culture'
    | 'sports'
    | 'technology'
    | 'terrorism-extremism'
    | 'travel'
    | 'url-shortener'
    | 'violence'
    | 'weapons'
  >;

  /**
   * Navigation categories. Browserbase blocks a domain in any blocked category, even
   * if it is also in an allowed one.
   */
  blockedCategories?: Array<
    | 'adult'
    | 'ai-tools'
    | 'alcohol-tobacco'
    | 'business'
    | 'child-abuse'
    | 'communication'
    | 'dating'
    | 'drugs'
    | 'education'
    | 'entertainment'
    | 'finance'
    | 'gambling'
    | 'games'
    | 'government-military'
    | 'hacking'
    | 'hate'
    | 'health'
    | 'illegal-activity'
    | 'infrastructure'
    | 'kids'
    | 'lifestyle'
    | 'malware'
    | 'newly-registered'
    | 'news'
    | 'parked-inactive'
    | 'phishing-scams'
    | 'piracy'
    | 'proxy-anonymizer'
    | 'search-portal'
    | 'self-harm'
    | 'shopping'
    | 'social-media'
    | 'society-culture'
    | 'sports'
    | 'technology'
    | 'terrorism-extremism'
    | 'travel'
    | 'url-shortener'
    | 'violence'
    | 'weapons'
  >;

  /**
   * Decision for each of a domain's categories that has no category rule. The
   * strictest of a domain's category decisions applies, and overrides take
   * precedence.
   */
  defaultDecision?: 'allow' | 'block';

  /**
   * Free-form notes about the policy.
   */
  description?: string;

  /**
   * Per-host decisions that take precedence over category rules and the default.
   * Each host may appear once.
   */
  domainOverrides?: Array<NavigationPolicyUpdateParams.DomainOverride>;

  /**
   * Whether the policy can be bound to new sessions. Running sessions keep the
   * policy they started with. A disabled policy stays editable and can be
   * re-enabled.
   */
  enabled?: boolean;

  /**
   * Display name. A policy's id identifies it, not its name.
   */
  name?: string;

  /**
   * Decision for a domain, or one of its categories, that Browserbase can't
   * classify. It counts as one of the domain's category decisions, so the strictest
   * still applies.
   */
  unknownDomainBehavior?: 'allow' | 'block';
}

export namespace NavigationPolicyUpdateParams {
  export interface DomainOverride {
    /**
     * Decision for navigations to this host.
     */
    decision: 'allow' | 'block';

    /**
     * Host the override applies to, for example `example.com`. Matching is
     * case-insensitive and covers subdomains.
     */
    domain: string;
  }
}

export declare namespace NavigationPolicies {
  export {
    type NavigationPolicy as NavigationPolicy,
    type NavigationPolicyListResponse as NavigationPolicyListResponse,
    type NavigationPolicyCreateParams as NavigationPolicyCreateParams,
    type NavigationPolicyUpdateParams as NavigationPolicyUpdateParams,
  };
}
