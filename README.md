# TaskFlow Web

A TypeScript monorepo twin of `taskflow-api`: the same task/project-management
domain, split into a shared package, an Express API, and a React frontend.

```
packages/shared/   DTOs, validators, and utilities shared by both apps
apps/api/          Express + TypeScript backend (routes -> services -> repositories -> entities)
apps/web/          React + TypeScript frontend (components -> hooks -> api client -> shared types)
```

Each layer only talks to the layer directly below it. `apps/web` depends on
`packages/shared` for request/response types; `apps/api` depends on it for
shared validation and formatting utilities.
