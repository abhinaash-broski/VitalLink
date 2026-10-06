# Notifications

Planned, not built yet.

The in-app feed. Other modules and the nightly job create notifications; users read and mark them.

## Does

- `GET /me/notifications`, `POST /me/notifications/read`
- `notify(user, kind, dedupe_key, …)`: idempotent, called by other services
- No remote push in v1 (decision D9); retention 90 days

## Owns tables

`notifications`

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [04-database.md](../../../docs/04-database.md#47-notifications-and-library)
