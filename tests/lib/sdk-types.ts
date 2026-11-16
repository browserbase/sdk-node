// This file never executes. `./scripts/lint` type-checks it, so renaming, removing, or
// widening an SDK type to `any` fails CI. `exports.test.ts` covers the runtime exports.

import type Browserbase from '@browserbasehq/sdk';
import type { ClientOptions } from '@browserbasehq/sdk';
import type {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
  AuthenticationError,
  BadRequestError,
  BrowserbaseError,
  ConflictError,
  fileFromPath,
  InternalServerError,
  NotFoundError,
  PermissionDeniedError,
  RateLimitError,
  toFile,
  UnprocessableEntityError,
} from '@browserbasehq/sdk';

// These utility types form a small assertion library that operates
// entirely at compile time. The central idea is that `Check`
// constrains its type parameter to `true`. If a type expression
// resolves to anything other than `true` (because a field was
// removed, a type collapsed to `never`, or Stainless widened
// something to `any`) the constraint fails and `tsc` reports an
// error on the offending line.
//
// `IsNotAny` exploits a quirk of TypeScript's `any`: the
// intersection `0 & any` is `any`, so `0 extends 1 & any` is
// true. For every other type, `0 extends 1 & T` is false. This
// lets us reject `any` specifically, which matters because `any`
// would silently satisfy every shape check and hide real breakage.
//
// `IsNotNever` wraps T in a tuple to prevent distribution over
// conditional types. Without the tuple, `never extends never`
// distributes into zero branches and collapses to `never` rather
// than `true`.
//
// `HasKeys` checks that every key in the union K is present on T.
// We use it to verify optional fields still exist even when they
// don't appear in a structural-extends check.

type IsNotAny<T> = 0 extends 1 & T ? false : true;
type IsNotNever<T> = [T] extends [never] ? false : true;
type Exists<T> =
  IsNotAny<T> extends true ?
    IsNotNever<T> extends true ?
      true
    : false
  : false;
type Check<_T extends true> = void;
type HasKeys<T, K> = [K] extends [keyof T] ? true : false;

// These must fail: `never` satisfies `extends true`, so predicates must
// return `false` for a failed assertion.
// @ts-expect-error any must not satisfy an existence check
type _RejectAny = Check<Exists<any>>;
// @ts-expect-error never must not satisfy an existence check
type _RejectNever = Check<Exists<never>>;
// @ts-expect-error a missing optional key must fail
type _RejectMissingKey = Check<HasKeys<{ id: string }, 'missing'>>;

// The checks below verify that the SDK's public surface area has
// not shrunk. Each `Check<Exists<...>>` confirms that a type
// still exists and is neither `any` nor `never`. These are grouped
// by concern: top-level exports, error classes, namespaced
// resource types, and session sub-resources.

// Top-level exports
type _TopLevel = [
  Check<Exists<Browserbase>>,
  Check<Exists<ClientOptions>>,
  Check<Exists<typeof fileFromPath>>,
  Check<Exists<typeof toFile>>,
];

// Error classes
type _Errors = [
  Check<Exists<APIConnectionError>>,
  Check<Exists<APIConnectionTimeoutError>>,
  Check<Exists<APIError>>,
  Check<Exists<APIUserAbortError>>,
  Check<Exists<AuthenticationError>>,
  Check<Exists<BadRequestError>>,
  Check<Exists<BrowserbaseError>>,
  Check<Exists<ConflictError>>,
  Check<Exists<InternalServerError>>,
  Check<Exists<NotFoundError>>,
  Check<Exists<PermissionDeniedError>>,
  Check<Exists<RateLimitError>>,
  Check<Exists<UnprocessableEntityError>>,
];

// Namespace exports (Browserbase.*)
type _Namespace = [Check<Exists<Browserbase.RequestOptions>>];

type _Resources = [
  Check<Exists<Browserbase.Contexts>>,
  Check<Exists<Browserbase.Extensions>>,
  Check<Exists<Browserbase.FetchAPI>>,
  Check<Exists<Browserbase.Projects>>,
  Check<Exists<Browserbase.Sessions>>,
];

type _ContextTypes = [
  Check<Exists<Browserbase.Context>>,
  Check<Exists<Browserbase.ContextCreateParams>>,
  Check<Exists<Browserbase.ContextCreateResponse>>,
  Check<Exists<Browserbase.ContextUpdateResponse>>,
];

type _ExtensionTypes = [
  Check<Exists<Browserbase.Extension>>,
  Check<Exists<Browserbase.ExtensionCreateParams>>,
];

type _ProjectTypes = [
  Check<Exists<Browserbase.Project>>,
  Check<Exists<Browserbase.ProjectListResponse>>,
  Check<Exists<Browserbase.ProjectUsage>>,
];

type _SessionTypes = [
  Check<Exists<Browserbase.Session>>,
  Check<Exists<Browserbase.SessionCreateParams>>,
  Check<Exists<Browserbase.SessionCreateResponse>>,
  Check<Exists<Browserbase.SessionListParams>>,
  Check<Exists<Browserbase.SessionListResponse>>,
  Check<Exists<Browserbase.SessionLiveURLs>>,
  Check<Exists<Browserbase.SessionRetrieveResponse>>,
  Check<Exists<Browserbase.SessionUpdateParams>>,
];

type _SessionSubresourceClasses = [
  Check<Exists<Browserbase.Sessions.Downloads>>,
  Check<Exists<Browserbase.Sessions.Logs>>,
  Check<Exists<Browserbase.Sessions.Recording>>,
  Check<Exists<Browserbase.Sessions.Uploads>>,
];

type _SessionSubresourceTypes = [
  Check<Exists<Browserbase.Sessions.LogListResponse>>,
  Check<Exists<Browserbase.Sessions.RecordingRetrieveResponse>>,
  Check<Exists<Browserbase.Sessions.SessionLog>>,
  Check<Exists<Browserbase.Sessions.SessionRecording>>,
  Check<Exists<Browserbase.Sessions.UploadCreateParams>>,
  Check<Exists<Browserbase.Sessions.UploadCreateResponse>>,
];

// Existence checks tell us that a type exists, but they can't
// tell us what it looks like. The shapes below assert that each
// SDK type still carries the fields our users depend on, with the
// correct value types and optionality.
//
// Each shape uses a conditional-extends pattern: if the SDK type
// extends the expected structural type, the expression resolves
// to `true`; otherwise it resolves to `false`, which violates the
// `Check` constraint and surfaces a compile error. A companion
// `HasKeys` check ensures that optional properties still exist on
// the type even though they may be absent from the value.
//
// We intentionally mirror the full field set rather than spot-
// checking a few fields. Stainless regenerates the entire type
// from the OpenAPI spec, so any field could vanish between builds.

// ClientOptions
type _ClientOptionsShape = Check<
  HasKeys<
    ClientOptions,
    | 'apiKey'
    | 'baseURL'
    | 'defaultHeaders'
    | 'defaultQuery'
    | 'fetch'
    | 'httpAgent'
    | 'maxRetries'
    | 'timeout'
  >
>;

// Context
type _ContextCreateParamsKeys = Check<HasKeys<Browserbase.ContextCreateParams, 'projectId'>>;
type _ContextShape = Check<
  Browserbase.Context extends (
    {
      id: string;
      createdAt: string;
      projectId: string;
      updatedAt: string;
    }
  ) ?
    true
  : false
>;

type _ContextCreateParamsShape = Check<
  Browserbase.ContextCreateParams extends (
    {
      projectId?: string;
    }
  ) ?
    true
  : false
>;

type _ContextCreateResponseShape = Check<
  Browserbase.ContextCreateResponse extends (
    {
      id: string;
      cipherAlgorithm: string;
      initializationVectorSize: number;
      publicKey: string;
      uploadUrl: string;
    }
  ) ?
    true
  : false
>;

type _ContextUpdateResponseShape = Check<
  Browserbase.ContextUpdateResponse extends (
    {
      id: string;
      cipherAlgorithm: string;
      initializationVectorSize: number;
      publicKey: string;
      uploadUrl: string;
    }
  ) ?
    true
  : false
>;

// Extension
type _ExtensionShape = Check<
  Browserbase.Extension extends (
    {
      id: string;
      createdAt: string;
      fileName: string;
      projectId: string;
      updatedAt: string;
    }
  ) ?
    true
  : false
>;

type _ExtensionCreateParamsKeys = Check<HasKeys<Browserbase.ExtensionCreateParams, 'file'>>;

// FetchAPI
type _FetchAPICreateParamsShape = Check<
  Browserbase.FetchAPICreateParams extends (
    {
      url: string;
    }
  ) ?
    true
  : false
>;

type _FetchAPICreateParamsOptionalKeys = Check<
  HasKeys<Browserbase.FetchAPICreateParams, 'allowInsecureSsl' | 'allowRedirects' | 'proxies'>
>;

type _FetchAPICreateResponseShape = Check<
  Browserbase.FetchAPICreateResponse extends (
    {
      id: string;
      content: string | Record<string, unknown>;
      contentType: string;
      encoding: string;
      headers: Record<string, string>;
      statusCode: number;
    }
  ) ?
    true
  : false
>;

// Project
type _ProjectShape = Check<
  Browserbase.Project extends (
    {
      id: string;
      concurrency: number;
      createdAt: string;
      defaultTimeout: number;
      name: string;
      ownerId: string;
      updatedAt: string;
    }
  ) ?
    true
  : false
>;

type _ProjectListResponseShape = Check<
  Browserbase.ProjectListResponse extends Array<Browserbase.Project> ? true : false
>;

type _ProjectUsageShape = Check<
  Browserbase.ProjectUsage extends (
    {
      browserMinutes: number;
      proxyBytes: number;
    }
  ) ?
    true
  : false
>;

// Session
type _SessionShape = Check<
  Browserbase.Session extends (
    {
      id: string;
      createdAt: string;
      expiresAt: string;
      keepAlive: boolean;
      projectId: string;
      proxyBytes: number;
      region: 'us-west-2' | 'us-east-1' | 'eu-central-1' | 'ap-southeast-1';
      startedAt: string;
      status: 'PENDING' | 'RUNNING' | 'ERROR' | 'TIMED_OUT' | 'COMPLETED';
      updatedAt: string;
      contextId?: string;
      endedAt?: string;
      userMetadata?: Record<string, unknown>;
    }
  ) ?
    true
  : false
>;

type _SessionOptionalKeys = Check<HasKeys<Browserbase.Session, 'contextId' | 'endedAt' | 'userMetadata'>>;

type _SessionCreateParamsShape = Check<
  Browserbase.SessionCreateParams extends (
    {
      projectId?: string;
      browserSettings?: Browserbase.SessionCreateParams.BrowserSettings;
      extensionId?: string;
      keepAlive?: boolean;
      proxies?:
        | boolean
        | Array<
            | Browserbase.SessionCreateParams.BrowserbaseProxyConfig
            | Browserbase.SessionCreateParams.ExternalProxyConfig
            | Browserbase.SessionCreateParams.NoneProxyConfig
          >;
      region?: 'us-west-2' | 'us-east-1' | 'eu-central-1' | 'ap-southeast-1';
      api_timeout?: number;
      userMetadata?: Record<string, unknown>;
    }
  ) ?
    true
  : false
>;

type _SessionCreateParamsOptionalKeys = Check<
  HasKeys<
    Browserbase.SessionCreateParams,
    | 'projectId'
    | 'browserSettings'
    | 'extensionId'
    | 'keepAlive'
    | 'proxies'
    | 'region'
    | 'api_timeout'
    | 'userMetadata'
  >
>;

// SessionCreateParams nested types
type _SessionCreateParamsNestedTypes = [
  Check<Exists<Browserbase.SessionCreateParams.BrowserSettings>>,
  Check<Exists<Browserbase.SessionCreateParams.BrowserbaseProxyConfig>>,
  Check<Exists<Browserbase.SessionCreateParams.ExternalProxyConfig>>,
];

type _BrowserSettingsShape = Check<
  Browserbase.SessionCreateParams.BrowserSettings extends (
    {
      advancedStealth?: boolean;
      blockAds?: boolean;
      captchaImageSelector?: string;
      captchaInputSelector?: string;
      context?: Browserbase.SessionCreateParams.BrowserSettings.Context;
      extensionId?: string;
      logSession?: boolean;
      recordSession?: boolean;
      solveCaptchas?: boolean;
      verified?: boolean;
      viewport?: Browserbase.SessionCreateParams.BrowserSettings.Viewport;
    }
  ) ?
    true
  : false
>;

type _BrowserSettingsOptionalKeys = Check<
  HasKeys<
    Browserbase.SessionCreateParams.BrowserSettings,
    | 'advancedStealth'
    | 'blockAds'
    | 'captchaImageSelector'
    | 'captchaInputSelector'
    | 'context'
    | 'extensionId'
    | 'logSession'
    | 'recordSession'
    | 'solveCaptchas'
    | 'verified'
    | 'viewport'
  >
>;

type _BrowserSettingsNestedTypes = [
  Check<Exists<Browserbase.SessionCreateParams.BrowserSettings.Context>>,
  Check<Exists<Browserbase.SessionCreateParams.BrowserSettings.Viewport>>,
];

type _BrowserSettingsContextShape = Check<
  Browserbase.SessionCreateParams.BrowserSettings.Context extends (
    {
      id: string;
      persist?: boolean;
    }
  ) ?
    true
  : false
>;

type _BrowserSettingsViewportShape = Check<
  Browserbase.SessionCreateParams.BrowserSettings.Viewport extends (
    {
      height?: number;
      width?: number;
    }
  ) ?
    true
  : false
>;

type _BrowserSettingsViewportOptionalKeys = Check<
  HasKeys<Browserbase.SessionCreateParams.BrowserSettings.Viewport, 'height' | 'width'>
>;

// Proxy configs are named types in the OpenAPI spec under
// `components/schemas`. Stainless generates distinct TypeScript
// types from named `$ref`s; inline schemas would collapse into
// opaque names like `UnionObjectVariant0`. These checks ensure
// the named types survive SDK generation.

type _BrowserbaseProxyConfigShape = Check<
  Browserbase.SessionCreateParams.BrowserbaseProxyConfig extends (
    {
      type: 'browserbase';
      domainPattern?: string;
      geolocation?: Browserbase.SessionCreateParams.BrowserbaseProxyConfig.Geolocation;
    }
  ) ?
    true
  : false
>;

type _BrowserbaseProxyConfigOptionalKeys = Check<
  HasKeys<Browserbase.SessionCreateParams.BrowserbaseProxyConfig, 'domainPattern' | 'geolocation'>
>;

type _BrowserbaseProxyGeolocationShape = Check<
  Browserbase.SessionCreateParams.BrowserbaseProxyConfig.Geolocation extends (
    {
      country: string;
      city?: string;
      state?: string;
    }
  ) ?
    true
  : false
>;

type _BrowserbaseProxyGeolocationOptionalKeys = Check<
  HasKeys<Browserbase.SessionCreateParams.BrowserbaseProxyConfig.Geolocation, 'city' | 'state'>
>;

type _ExternalProxyConfigShape = Check<
  Browserbase.SessionCreateParams.ExternalProxyConfig extends (
    {
      server: string;
      type: 'external';
      domainPattern?: string;
      password?: string;
      username?: string;
    }
  ) ?
    true
  : false
>;

type _ExternalProxyConfigOptionalKeys = Check<
  HasKeys<Browserbase.SessionCreateParams.ExternalProxyConfig, 'domainPattern' | 'password' | 'username'>
>;

// -- SessionCreateResponse --
type _SessionCreateResponseShape = Check<
  Browserbase.SessionCreateResponse extends (
    {
      id: string;
      connectUrl: string;
      createdAt: string;
      expiresAt: string;
      keepAlive: boolean;
      projectId: string;
      proxyBytes: number;
      region: 'us-west-2' | 'us-east-1' | 'eu-central-1' | 'ap-southeast-1';
      seleniumRemoteUrl: string;
      signingKey: string;
      startedAt: string;
      status: 'PENDING' | 'RUNNING' | 'ERROR' | 'TIMED_OUT' | 'COMPLETED';
      updatedAt: string;
      contextId?: string;
      endedAt?: string;
      userMetadata?: Record<string, unknown>;
    }
  ) ?
    true
  : false
>;

type _SessionCreateResponseOptionalKeys = Check<
  HasKeys<Browserbase.SessionCreateResponse, 'contextId' | 'endedAt' | 'userMetadata'>
>;

// -- SessionListParams --
type _SessionListParamsShape = Check<
  Browserbase.SessionListParams extends (
    {
      q?: string;
      status?: 'PENDING' | 'RUNNING' | 'ERROR' | 'TIMED_OUT' | 'COMPLETED';
    }
  ) ?
    true
  : false
>;

type _SessionListParamsKeys = Check<HasKeys<Browserbase.SessionListParams, 'q' | 'status'>>;

type _SessionListResponseShape = Check<
  Browserbase.SessionListResponse extends Array<Browserbase.Session> ? true : false
>;

type _SessionLiveURLsShape = Check<
  Browserbase.SessionLiveURLs extends (
    {
      debuggerFullscreenUrl: string;
      debuggerUrl: string;
      pages: Array<{
        id: string;
        debuggerFullscreenUrl: string;
        debuggerUrl: string;
        faviconUrl: string;
        title: string;
        url: string;
      }>;
      wsUrl: string;
    }
  ) ?
    true
  : false
>;

// SessionRetrieveResponse
type _SessionRetrieveResponseShape = Check<
  Browserbase.SessionRetrieveResponse extends (
    {
      id: string;
      createdAt: string;
      expiresAt: string;
      keepAlive: boolean;
      projectId: string;
      proxyBytes: number;
      region: 'us-west-2' | 'us-east-1' | 'eu-central-1' | 'ap-southeast-1';
      startedAt: string;
      status: 'PENDING' | 'RUNNING' | 'ERROR' | 'TIMED_OUT' | 'COMPLETED';
      updatedAt: string;
      connectUrl?: string;
      contextId?: string;
      endedAt?: string;
      seleniumRemoteUrl?: string;
      signingKey?: string;
      userMetadata?: Record<string, unknown>;
    }
  ) ?
    true
  : false
>;

type _SessionRetrieveResponseOptionalKeys = Check<
  HasKeys<
    Browserbase.SessionRetrieveResponse,
    'connectUrl' | 'contextId' | 'endedAt' | 'seleniumRemoteUrl' | 'signingKey' | 'userMetadata'
  >
>;

// SessionUpdateParams
type _SessionUpdateParamsKeys = Check<HasKeys<Browserbase.SessionUpdateParams, 'projectId'>>;
type _SessionUpdateParamsShape = Check<
  Browserbase.SessionUpdateParams extends (
    {
      projectId?: string;
      status: 'REQUEST_RELEASE';
    }
  ) ?
    true
  : false
>;

// SessionLog (via Sessions namespace)
type _SessionLogShape = Check<
  Browserbase.Sessions.SessionLog extends (
    {
      method: string;
      pageId: number;
      sessionId: string;
      frameId?: string;
      loaderId?: string;
      request?: Browserbase.Sessions.SessionLog.Request;
      response?: Browserbase.Sessions.SessionLog.Response;
      timestamp?: number;
    }
  ) ?
    true
  : false
>;

type _SessionLogOptionalKeys = Check<
  HasKeys<Browserbase.Sessions.SessionLog, 'frameId' | 'loaderId' | 'request' | 'response' | 'timestamp'>
>;

// SessionLog nested types
type _SessionLogNestedTypes = [
  Check<Exists<Browserbase.Sessions.SessionLog.Request>>,
  Check<Exists<Browserbase.Sessions.SessionLog.Response>>,
];

type _SessionLogRequestShape = Check<
  Browserbase.Sessions.SessionLog.Request extends (
    {
      params: Record<string, unknown>;
      rawBody: string;
      timestamp?: number;
    }
  ) ?
    true
  : false
>;

type _SessionLogRequestOptionalKeys = Check<HasKeys<Browserbase.Sessions.SessionLog.Request, 'timestamp'>>;

type _SessionLogResponseShape = Check<
  Browserbase.Sessions.SessionLog.Response extends (
    {
      rawBody: string;
      result: Record<string, unknown>;
      timestamp?: number;
    }
  ) ?
    true
  : false
>;

type _SessionLogResponseOptionalKeys = Check<HasKeys<Browserbase.Sessions.SessionLog.Response, 'timestamp'>>;

type _LogListResponseShape = Check<
  Browserbase.Sessions.LogListResponse extends Array<Browserbase.Sessions.SessionLog> ? true : false
>;

// SessionRecording (via Sessions namespace)
type _SessionRecordingShape = Check<
  Browserbase.Sessions.SessionRecording extends (
    {
      data: Record<string, unknown>;
      sessionId: string;
      timestamp: number;
      type: number;
    }
  ) ?
    true
  : false
>;

type _RecordingRetrieveResponseShape = Check<
  Browserbase.Sessions.RecordingRetrieveResponse extends Array<Browserbase.Sessions.SessionRecording> ? true
  : false
>;

// Uploads (via Sessions namespace)
type _UploadCreateParamsKeys = Check<HasKeys<Browserbase.Sessions.UploadCreateParams, 'file'>>;

type _UploadCreateResponseShape = Check<
  Browserbase.Sessions.UploadCreateResponse extends (
    {
      message: string;
    }
  ) ?
    true
  : false
>;

// A type can have the right shape and still break callers if
// the method that returns it changes its signature. These checks
// verify that each resource method still returns the expected
// type. We use `Awaited<ReturnType<...>>` to unwrap the Promise
// and test the resolved value directly.
//
// The `bb` variable is declared but never assigned. It only
// exists to give TypeScript something to hang `typeof` on.

declare const bb: Browserbase;

type _MethodReturnTypes = [
  // Contexts
  Check<
    Awaited<ReturnType<typeof bb.contexts.create>> extends Browserbase.ContextCreateResponse ? true : false
  >,
  Check<Awaited<ReturnType<typeof bb.contexts.retrieve>> extends Browserbase.Context ? true : false>,
  Check<
    Awaited<ReturnType<typeof bb.contexts.update>> extends Browserbase.ContextUpdateResponse ? true : false
  >,

  // FetchAPI
  Check<
    Awaited<ReturnType<typeof bb.fetchAPI.create>> extends Browserbase.FetchAPICreateResponse ? true : false
  >,

  // Extensions
  Check<Awaited<ReturnType<typeof bb.extensions.create>> extends Browserbase.Extension ? true : false>,
  Check<Awaited<ReturnType<typeof bb.extensions.delete>> extends void ? true : false>,
  Check<Awaited<ReturnType<typeof bb.extensions.retrieve>> extends Browserbase.Extension ? true : false>,

  // Projects
  Check<Awaited<ReturnType<typeof bb.projects.list>> extends Browserbase.ProjectListResponse ? true : false>,
  Check<Awaited<ReturnType<typeof bb.projects.retrieve>> extends Browserbase.Project ? true : false>,
  Check<Awaited<ReturnType<typeof bb.projects.usage>> extends Browserbase.ProjectUsage ? true : false>,

  // Sessions
  Check<
    Awaited<ReturnType<typeof bb.sessions.create>> extends Browserbase.SessionCreateResponse ? true : false
  >,
  Check<Awaited<ReturnType<typeof bb.sessions.debug>> extends Browserbase.SessionLiveURLs ? true : false>,
  Check<Awaited<ReturnType<typeof bb.sessions.list>> extends Browserbase.SessionListResponse ? true : false>,
  Check<
    Awaited<ReturnType<typeof bb.sessions.retrieve>> extends Browserbase.SessionRetrieveResponse ? true
    : false
  >,
  Check<Awaited<ReturnType<typeof bb.sessions.update>> extends Browserbase.Session ? true : false>,

  // Session subresources
  Check<Exists<Awaited<ReturnType<typeof bb.sessions.downloads.list>>>>,
  Check<
    Awaited<ReturnType<typeof bb.sessions.logs.list>> extends Browserbase.Sessions.LogListResponse ? true
    : false
  >,
  Check<
    Awaited<ReturnType<typeof bb.sessions.recording.retrieve>> extends (
      Browserbase.Sessions.RecordingRetrieveResponse
    ) ?
      true
    : false
  >,
  Check<
    Awaited<ReturnType<typeof bb.sessions.uploads.create>> extends Browserbase.Sessions.UploadCreateResponse ?
      true
    : false
  >,
];

// Subresource instances
type _SubresourceInstances = [
  Check<Exists<typeof bb.sessions.downloads>>,
  Check<Exists<typeof bb.sessions.logs>>,
  Check<Exists<typeof bb.sessions.recording>>,
  Check<Exists<typeof bb.sessions.uploads>>,
];
