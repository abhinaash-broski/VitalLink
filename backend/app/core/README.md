# Shared core

Planned, not built yet.

Infrastructure every module uses. It knows no module, and nothing here imports from `app.modules`.

## Does

- `settings.py`: all config from env vars (pydantic-settings)
- `db.py`: async engine (pool 5 + 5), one transaction per request
- `security.py`: JWT verification via Supabase JWKS (10-min cache), `CurrentUser`, step-up checks
- `consent.py`: pure `decide()` + `ConsentGate` + `require_scope()` dependency
- `audit.py`: `AuditWriter`, the only writer of `audit_log`, with its own transaction
- `errors.py`: the error envelope and exception → status mapping
- `storage.py`: sign upload/download, stat and delete objects in the private bucket
- `jobs.py`: nightly runner, `JobStep` interface, per-user transactions, summary
- `ids.py`, `ratelimit.py`, `logging.py`

## Planned files

See the list above.

Design: [02-architecture.md](../../docs/02-architecture.md#shared-core)
