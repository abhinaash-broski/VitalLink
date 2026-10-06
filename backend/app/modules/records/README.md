# Records

Planned, not built yet.

User-uploaded documents behind signed URLs, plus lab panels and results.

## Does

- Records CRUD, `GET /me/records/overview`
- Upload → confirm (server stats the object) → download; stale pending uploads cleaned nightly
- Lab panels (manual entry), previous value, interpretation, latest result; blood-group analytes rejected

## Owns tables

`health_records`, `lab_panels`, `lab_results`

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [04-database.md](../../../docs/04-database.md#46-records-and-care)
