// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Projects extends APIResource {
  /**
   * Get a Project
   */
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<ProjectRetrieveResponse> {
    return this._client.get(`/v1/projects/${id}`, options);
  }

  /**
   * List Projects
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ProjectListResponse> {
    return this._client.get('/v1/projects', options);
  }

  /**
   * Get Project Usage
   */
  usage(id: string, options?: Core.RequestOptions): Core.APIPromise<ProjectUsageResponse> {
    return this._client.get(`/v1/projects/${id}/usage`, options);
  }
}

export interface ProjectRetrieveResponse {
  id: string;

  /**
   * The maximum number of sessions that this project can run concurrently.
   */
  concurrency: number;

  createdAt: string;

  defaultTimeout: number;

  name: string;

  ownerId: string;

  updatedAt: string;
}

export type ProjectListResponse = Array<ProjectListResponse.ProjectListResponseItem>;

export namespace ProjectListResponse {
  export interface ProjectListResponseItem {
    id: string;

    /**
     * The maximum number of sessions that this project can run concurrently.
     */
    concurrency: number;

    createdAt: string;

    defaultTimeout: number;

    name: string;

    ownerId: string;

    updatedAt: string;
  }
}

export interface ProjectUsageResponse {
  browserMinutes: number;

  proxyBytes: number;
}

export declare namespace Projects {
  export {
    type ProjectRetrieveResponse as ProjectRetrieveResponse,
    type ProjectListResponse as ProjectListResponse,
    type ProjectUsageResponse as ProjectUsageResponse,
  };
}
