# Sharing

Planned, not built yet.

Consents, shared views, the family view and the access log. Every cross-user read passes through here.

## Does

- Shares CRUD (needs a recent token), `GET /me/shared-with-me`, `GET /me/access-log`, `GET /me/privacy`
- `GET /me/family`, `GET /users/{id}/summary`
- Mounts every `/users/{id}/…` route; each declares `require_scope(...)` and calls the owning module's read service

## Owns tables

`consents`, `audit_log` (written only through core.audit)

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [06-security-and-consent.md](../../../docs/06-security-and-consent.md)
