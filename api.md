# Certificates

Types:

- <code><a href="./src/resources/certificates.ts">Certificate</a></code>
- <code><a href="./src/resources/certificates.ts">CertificateListResponse</a></code>

Methods:

- <code title="post /v1/certificates">client.certificates.<a href="./src/resources/certificates.ts">create</a>({ ...params }) -> Certificate</code>
- <code title="get /v1/certificates/{id}">client.certificates.<a href="./src/resources/certificates.ts">retrieve</a>(id) -> Certificate</code>
- <code title="get /v1/certificates">client.certificates.<a href="./src/resources/certificates.ts">list</a>() -> CertificateListResponse</code>
- <code title="delete /v1/certificates/{id}">client.certificates.<a href="./src/resources/certificates.ts">delete</a>(id) -> void</code>

# Contexts

Types:

- <code><a href="./src/resources/contexts.ts">Context</a></code>
- <code><a href="./src/resources/contexts.ts">ContextCreateResponse</a></code>
- <code><a href="./src/resources/contexts.ts">ContextUpdateResponse</a></code>

Methods:

- <code title="post /v1/contexts">client.contexts.<a href="./src/resources/contexts.ts">create</a>({ ...params }) -> ContextCreateResponse</code>
- <code title="get /v1/contexts/{id}">client.contexts.<a href="./src/resources/contexts.ts">retrieve</a>(id) -> Context</code>
- <code title="put /v1/contexts/{id}">client.contexts.<a href="./src/resources/contexts.ts">update</a>(id) -> ContextUpdateResponse</code>
- <code title="delete /v1/contexts/{id}">client.contexts.<a href="./src/resources/contexts.ts">delete</a>(id) -> void</code>

# Extensions

Types:

- <code><a href="./src/resources/extensions.ts">Extension</a></code>

Methods:

- <code title="post /v1/extensions">client.extensions.<a href="./src/resources/extensions.ts">create</a>({ ...params }) -> Extension</code>
- <code title="get /v1/extensions/{id}">client.extensions.<a href="./src/resources/extensions.ts">retrieve</a>(id) -> Extension</code>
- <code title="delete /v1/extensions/{id}">client.extensions.<a href="./src/resources/extensions.ts">delete</a>(id) -> void</code>

# FetchAPI

Types:

- <code><a href="./src/resources/fetch-api.ts">FetchAPICreateResponse</a></code>

Methods:

- <code title="post /v1/fetch">client.fetchAPI.<a href="./src/resources/fetch-api.ts">create</a>({ ...params }) -> FetchAPICreateResponse</code>

# Projects

Types:

- <code><a href="./src/resources/projects.ts">Project</a></code>
- <code><a href="./src/resources/projects.ts">ProjectUsage</a></code>
- <code><a href="./src/resources/projects.ts">ProjectListResponse</a></code>

Methods:

- <code title="get /v1/projects/{id}">client.projects.<a href="./src/resources/projects.ts">retrieve</a>(id) -> Project</code>
- <code title="get /v1/projects">client.projects.<a href="./src/resources/projects.ts">list</a>() -> ProjectListResponse</code>
- <code title="get /v1/projects/{id}/usage">client.projects.<a href="./src/resources/projects.ts">usage</a>(id) -> ProjectUsage</code>

# Search

Types:

- <code><a href="./src/resources/search.ts">SearchWebResponse</a></code>

Methods:

- <code title="post /v1/search">client.search.<a href="./src/resources/search.ts">web</a>({ ...params }) -> SearchWebResponse</code>

# Sessions

Types:

- <code><a href="./src/resources/sessions/sessions.ts">Session</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionLiveURLs</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionCreateResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionRetrieveResponse</a></code>
- <code><a href="./src/resources/sessions/sessions.ts">SessionListResponse</a></code>

Methods:

- <code title="post /v1/sessions">client.sessions.<a href="./src/resources/sessions/sessions.ts">create</a>({ ...params }) -> SessionCreateResponse</code>
- <code title="get /v1/sessions/{id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">retrieve</a>(id) -> SessionRetrieveResponse</code>
- <code title="post /v1/sessions/{id}">client.sessions.<a href="./src/resources/sessions/sessions.ts">update</a>(id, { ...params }) -> Session</code>
- <code title="get /v1/sessions">client.sessions.<a href="./src/resources/sessions/sessions.ts">list</a>({ ...params }) -> SessionListResponse</code>
- <code title="get /v1/sessions/{id}/debug">client.sessions.<a href="./src/resources/sessions/sessions.ts">debug</a>(id) -> SessionLiveURLs</code>

## Downloads

Methods:

- <code title="get /v1/sessions/{id}/downloads">client.sessions.downloads.<a href="./src/resources/sessions/downloads.ts">list</a>(id) -> Response</code>

## Logs

Types:

- <code><a href="./src/resources/sessions/logs.ts">SessionLog</a></code>
- <code><a href="./src/resources/sessions/logs.ts">LogListResponse</a></code>

Methods:

- <code title="get /v1/sessions/{id}/logs">client.sessions.logs.<a href="./src/resources/sessions/logs.ts">list</a>(id) -> LogListResponse</code>

## Recording

Types:

- <code><a href="./src/resources/sessions/recording/recording.ts">SessionRecording</a></code>
- <code><a href="./src/resources/sessions/recording/recording.ts">RecordingRetrieveResponse</a></code>

Methods:

- <code title="get /v1/sessions/{id}/recording">client.sessions.recording.<a href="./src/resources/sessions/recording/recording.ts">retrieve</a>(id) -> RecordingRetrieveResponse</code>

### Downloads

Types:

- <code><a href="./src/resources/sessions/recording/downloads.ts">RecordingDownload</a></code>
- <code><a href="./src/resources/sessions/recording/downloads.ts">DownloadCreateResponse</a></code>
- <code><a href="./src/resources/sessions/recording/downloads.ts">DownloadListResponse</a></code>

Methods:

- <code title="post /v1/sessions/{id}/recording/downloads">client.sessions.recording.downloads.<a href="./src/resources/sessions/recording/downloads.ts">create</a>(id) -> DownloadCreateResponse</code>
- <code title="get /v1/sessions/{id}/recording/downloads">client.sessions.recording.downloads.<a href="./src/resources/sessions/recording/downloads.ts">list</a>(id) -> DownloadListResponse</code>

## Uploads

Types:

- <code><a href="./src/resources/sessions/uploads.ts">UploadCreateResponse</a></code>

Methods:

- <code title="post /v1/sessions/{id}/uploads">client.sessions.uploads.<a href="./src/resources/sessions/uploads.ts">create</a>(id, { ...params }) -> UploadCreateResponse</code>

## Replays

Types:

- <code><a href="./src/resources/sessions/replays.ts">ReplayRetrieveResponse</a></code>

Methods:

- <code title="get /v1/sessions/{id}/replays">client.sessions.replays.<a href="./src/resources/sessions/replays.ts">retrieve</a>(id) -> ReplayRetrieveResponse</code>
- <code title="get /v1/sessions/{id}/replays/{pageId}">client.sessions.replays.<a href="./src/resources/sessions/replays.ts">retrievePage</a>(id, pageId) -> Response</code>

# Agents

Types:

- <code><a href="./src/resources/agents/agents.ts">AgentCreateResponse</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentRetrieveResponse</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentUpdateResponse</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentListResponse</a></code>

Methods:

- <code title="post /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">create</a>({ ...params }) -> AgentCreateResponse</code>
- <code title="get /v1/agents/{agentId}">client.agents.<a href="./src/resources/agents/agents.ts">retrieve</a>(agentId) -> AgentRetrieveResponse</code>
- <code title="patch /v1/agents/{agentId}">client.agents.<a href="./src/resources/agents/agents.ts">update</a>(agentId, { ...params }) -> AgentUpdateResponse</code>
- <code title="get /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">list</a>({ ...params }) -> AgentListResponse</code>
- <code title="delete /v1/agents/{agentId}">client.agents.<a href="./src/resources/agents/agents.ts">delete</a>(agentId) -> void</code>

## Runs

Types:

- <code><a href="./src/resources/agents/runs.ts">RunCreateResponse</a></code>
- <code><a href="./src/resources/agents/runs.ts">RunRetrieveResponse</a></code>
- <code><a href="./src/resources/agents/runs.ts">RunListResponse</a></code>
- <code><a href="./src/resources/agents/runs.ts">RunListMessagesResponse</a></code>

Methods:

- <code title="post /v1/agents/runs">client.agents.runs.<a href="./src/resources/agents/runs.ts">create</a>({ ...params }) -> RunCreateResponse</code>
- <code title="get /v1/agents/runs/{runId}">client.agents.runs.<a href="./src/resources/agents/runs.ts">retrieve</a>(runId) -> RunRetrieveResponse</code>
- <code title="get /v1/agents/runs">client.agents.runs.<a href="./src/resources/agents/runs.ts">list</a>({ ...params }) -> RunListResponse</code>
- <code title="get /v1/agents/runs/{runId}/messages">client.agents.runs.<a href="./src/resources/agents/runs.ts">listMessages</a>(runId, { ...params }) -> RunListMessagesResponse</code>
