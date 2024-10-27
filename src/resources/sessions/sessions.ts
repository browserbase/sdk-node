// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as SessionsAPI from './sessions';
import * as DownloadsAPI from './downloads';
import * as LogsAPI from './logs';
import * as RecordingAPI from './recording';
import * as UploadsAPI from './uploads';

export class Sessions extends APIResource {
  downloads: DownloadsAPI.Downloads = new DownloadsAPI.Downloads(this._client);
  logs: LogsAPI.Logs = new LogsAPI.Logs(this._client);
  recording: RecordingAPI.Recording = new RecordingAPI.Recording(this._client);
  uploads: UploadsAPI.Uploads = new UploadsAPI.Uploads(this._client);

  /**
   * Create a Session
   */
  create(body: SessionCreateParams, options?: Core.RequestOptions): Core.APIPromise<Session> {
    return this._client.post('/v1/sessions', { body, ...options });
  }

  /**
   * Session
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Session> {
    return this._client.get(`/v1/sessions/${id}`, options);
  }

  /**
   * Update Session
   */
  update(id: string, body: SessionUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Session> {
    return this._client.post(`/v1/sessions/${id}`, { body, ...options });
  }

  /**
   * List Sessions
   */
  list(query?: SessionListParams, options?: Core.RequestOptions): Core.APIPromise<SessionListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<SessionListResponse>;
  list(
    query: SessionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<SessionListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/sessions', { query, ...options });
  }

  /**
   * Session Live URLs
   */
  debug(id: string, options?: Core.RequestOptions): Core.APIPromise<SessionLiveURLs> {
    return this._client.get(`/v1/sessions/${id}/debug`, options);
  }
}

export interface Session {
  id: string;

  created_at: string;

  expires_at: string;

  /**
   * Indicates if the Session was created to be kept alive upon disconnections
   */
  keep_alive: boolean;

  /**
   * The Project ID linked to the Session.
   */
  project_id: string;

  region: string;

  started_at: string;

  status: 'RUNNING' | 'ERROR' | 'TIMED_OUT' | 'COMPLETED';

  updated_at: string;

  /**
   * CPU used by the Session
   */
  avg_cpu_usage?: number;

  connectUrl?: string;

  /**
   * Optional. The Context linked to the Session.
   */
  context_id?: string;

  ended_at?: string;

  is_idle?: boolean;

  /**
   * Memory used by the Session
   */
  memory_usage?: number;

  /**
   * Bytes used via the [Proxy](/features/stealth-mode#proxies-and-residential-ips)
   */
  proxy_bytes?: number;

  seleniumRemoteUrl?: string;

  signingKey?: string;

  viewport_height?: number;

  viewport_width?: number;
}

export interface SessionLiveURLs {
  debuggerFullscreenUrl: string;

  debuggerUrl: string;

  pages: Array<SessionLiveURLs.Page>;

  wsUrl: string;
}

export namespace SessionLiveURLs {
  export interface Page {
    id: string;

    debuggerFullscreenUrl: string;

    debuggerUrl: string;

    faviconUrl: string;

    title: string;

    url: string;
  }
}

export type SessionListResponse = Array<Session>;

export interface SessionCreateParams {
  /**
   * The Project ID. Can be found in
   * [Settings](https://www.browserbase.com/settings).
   */
  projectId: string;

  browserSettings?: SessionCreateParams.BrowserSettings;

  /**
   * The uploaded Extension ID. See
   * [Upload Extension](/reference/api/upload-an-extension).
   */
  extensionId?: string;

  /**
   * Set to true to keep the session alive even after disconnections. This is
   * available on the Startup plan only.
   */
  keepAlive?: boolean;

  /**
   * Proxy configuration. Can be true for default proxy, or an array of proxy
   * configurations.
   */
  proxies?: unknown | boolean;

  /**
   * Duration in seconds after which the session will automatically end. Defaults to
   * the Project's `defaultTimeout`.
   */
  timeout?: number;
}

export namespace SessionCreateParams {
  export interface BrowserSettings {
    /**
     * Enable or disable ad blocking in the browser. Defaults to `false`.
     */
    blockAds?: boolean;

    context?: BrowserSettings.Context;

    /**
     * The uploaded Extension ID. See
     * [Upload Extension](/reference/api/upload-an-extension).
     */
    extensionId?: string;

    /**
     * See usage examples
     * [in the Stealth Mode page](/features/stealth-mode#fingerprinting).
     */
    fingerprint?: BrowserSettings.Fingerprint;

    /**
     * Enable or disable session logging. Defaults to `true`.
     */
    logSession?: boolean;

    /**
     * Enable or disable session recording. Defaults to `true`.
     */
    recordSession?: boolean;

    /**
     * Enable or disable captcha solving in the browser. Defaults to `true`.
     */
    solveCaptchas?: boolean;

    viewport?: BrowserSettings.Viewport;
  }

  export namespace BrowserSettings {
    export interface Context {
      /**
       * The Context ID.
       */
      id: string;

      /**
       * Whether or not to persist the context after browsing. Defaults to `false`.
       */
      persist: boolean;
    }

    /**
     * See usage examples
     * [in the Stealth Mode page](/features/stealth-mode#fingerprinting).
     */
    export interface Fingerprint {
      browsers?: Array<'chrome' | 'edge' | 'firefox' | 'safari'>;

      devices?: Array<'desktop' | 'mobile'>;

      httpVersion?: 1 | 2;

      /**
       * Full list of locales is available
       * [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language).
       */
      locales?: Array<string>;

      /**
       * Note: `operatingSystems` set to `ios` or `android` requires `devices` to include
       * `"mobile"`.
       */
      operatingSystems?: Array<'android' | 'ios' | 'linux' | 'macos' | 'windows'>;

      screen?: Fingerprint.Screen;
    }

    export namespace Fingerprint {
      export interface Screen {
        maxHeight?: number;

        maxWidth?: number;

        minHeight?: number;

        minWidth?: number;
      }
    }

    export interface Viewport {
      height?: number;

      width?: number;
    }
  }
}

export interface SessionUpdateParams {
  /**
   * The Project ID. Can be found in
   * [Settings](https://www.browserbase.com/settings).
   */
  projectId: string;

  /**
   * Set to `REQUEST_RELEASE` to request that the session complete. Use before
   * session's timeout to avoid additional charges.
   */
  status: 'REQUEST_RELEASE';
}

export interface SessionListParams {
  status?: 'RUNNING' | 'ERROR' | 'TIMED_OUT' | 'COMPLETED';
}

export namespace Sessions {
  export import Session = SessionsAPI.Session;
  export import SessionLiveURLs = SessionsAPI.SessionLiveURLs;
  export import SessionListResponse = SessionsAPI.SessionListResponse;
  export import SessionCreateParams = SessionsAPI.SessionCreateParams;
  export import SessionUpdateParams = SessionsAPI.SessionUpdateParams;
  export import SessionListParams = SessionsAPI.SessionListParams;
  export import Downloads = DownloadsAPI.Downloads;
  export import Logs = LogsAPI.Logs;
  export import SessionLog = LogsAPI.SessionLog;
  export import LogListResponse = LogsAPI.LogListResponse;
  export import Recording = RecordingAPI.Recording;
  export import SessionRecording = RecordingAPI.SessionRecording;
  export import RecordingRetrieveResponse = RecordingAPI.RecordingRetrieveResponse;
  export import Uploads = UploadsAPI.Uploads;
  export import UploadCreateResponse = UploadsAPI.UploadCreateResponse;
  export import UploadCreateParams = UploadsAPI.UploadCreateParams;
}
