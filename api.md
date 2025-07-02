# Contexts

Types:

- <code><a href="./src/resources/contexts.ts">ContextCreateResponse</a></code>
- <code><a href="./src/resources/contexts.ts">ContextRetrieveResponse</a></code>
- <code><a href="./src/resources/contexts.ts">ContextUpdateResponse</a></code>

Methods:

- <code title="post /v1/contexts">client.contexts.<a href="./src/resources/contexts.ts">create</a>({ ...params }) -> ContextCreateResponse</code>
- <code title="get /v1/contexts/{id}">client.contexts.<a href="./src/resources/contexts.ts">retrieve</a>(id) -> ContextRetrieveResponse</code>
- <code title="put /v1/contexts/{id}">client.contexts.<a href="./src/resources/contexts.ts">update</a>(id) -> ContextUpdateResponse</code>

# Extensions

Types:

- <code><a href="./src/resources/extensions.ts">ExtensionCreateResponse</a></code>
- <code><a href="./src/resources/extensions.ts">ExtensionRetrieveResponse</a></code>

Methods:

- <code title="post /v1/extensions">client.extensions.<a href="./src/resources/extensions.ts">create</a>({ ...params }) -> ExtensionCreateResponse</code>
- <code title="get /v1/extensions/{id}">client.extensions.<a href="./src/resources/extensions.ts">retrieve</a>(id) -> ExtensionRetrieveResponse</code>
- <code title="delete /v1/extensions/{id}">client.extensions.<a href="./src/resources/extensions.ts">delete</a>(id) -> void</code>

# Projects

Types:

- <code><a href="./src/resources/projects.ts">ProjectRetrieveResponse</a></code>
- <code><a href="./src/resources/projects.ts">ProjectListResponse</a></code>
- <code><a href="./src/resources/projects.ts">ProjectUsageResponse</a></code>

Methods:

- <code title="get /v1/projects/{id}">client.projects.<a href="./src/resources/projects.ts">retrieve</a>(id) -> ProjectRetrieveResponse</code>
- <code title="get /v1/projects">client.projects.<a href="./src/resources/projects.ts">list</a>() -> ProjectListResponse</code>
- <code title="get /v1/projects/{id}/usage">client.projects.<a href="./src/resources/projects.ts">usage</a>(id) -> ProjectUsageResponse</code>

# Sessions

Types:

- <code><a href="./src/resources/sessions/sessions.ts">SessionCreateResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionRetrieveResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionUpdateResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionListResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionDebugResponse</a></code>

Methods:

- <code title="post /v1/sessions">client.sessions.<a href="./src/resources/sessions/sessions.ts">create</a>({ ...params }) -> SessionCreateResponse</code>
- <code title="get /v1/sessions/{id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieve</a>(id) -> SessionRetrieveResponse</code>
- <code title="post /v1/sessions/{id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">update</a>(id, { ...params }) -> SessionUpdateResponse</code>
- <code title="get /v1/sessions">client.sessions.<a href="./src/resources/sessions/sessions.ts">list</a>({ ...params }) -> SessionListResponse</code>
- <code title="get /v1/sessions/{id}/debug">client.sessions.<a href="./src/resources/sessions/sessions.ts">debug</a>(id) -> SessionDebugResponse</code>

## Downloads

Methods:

- <code title="get /v1/sessions/{id}/downloads">client.sessions.downloads.<a href="./src/resources/sessions/downloads.ts">list</a>(id) -> Response</code>

## Logs

Types:

- <code><a href="./src/resources/sessions/logs.ts">LogListResponse</a></code>

Methods:

- <code title="get /v1/sessions/{id}/logs">client.sessions.logs.<a href="./src/resources/sessions/logs.ts">list</a>(id) -> LogListResponse</code>

## Recording

Types:

- <code><a href="./src/resources/sessions/recording.ts">RecordingRetrieveResponse</a></code>

Methods:

- <code title="get /v1/sessions/{id}/recording">client.sessions.recording.<a href="./src/resources/sessions/recording.ts">retrieve</a>(id) -> RecordingRetrieveResponse</code>

## Uploads

Types:

- <code><a href="./src/resources/sessions/uploads.ts">UploadCreateResponse</a></code>

Methods:

- <code title="post /v1/sessions/{id}/uploads">client.sessions.uploads.<a href="./src/resources/sessions/uploads.ts">create</a>(id, { ...params }) -> UploadCreateResponse</code>
