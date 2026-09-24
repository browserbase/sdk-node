// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as SecretsAPI from './secrets';
import { SecretAttachParams, SecretListParams, SecretListResponse, Secrets } from './secrets';

export class Functions extends APIResource {
  secrets: SecretsAPI.Secrets = new SecretsAPI.Secrets(this._client);
}

Functions.Secrets = Secrets;

export declare namespace Functions {
  export {
    Secrets as Secrets,
    type SecretListResponse as SecretListResponse,
    type SecretListParams as SecretListParams,
    type SecretAttachParams as SecretAttachParams,
  };
}
