# Account

Planned, not built yet.

Maps a sign-in token to a user, holds profile and settings, and runs export and delete.

## Does

- `GET /me` (insert-if-absent), `GET/PATCH /me/account`, `GET/PATCH /me/targets`
- `GET /me/export`: calls every module's export hook
- `DELETE /me`: revoke received shares → delete files → cascade rows → delete Supabase identity

## Owns tables

`users`, `profiles`

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [04-database.md](../../../docs/04-database.md#43-account-and-sharing)
