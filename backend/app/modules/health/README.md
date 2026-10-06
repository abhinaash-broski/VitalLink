# Health

Planned, not built yet.

Metric catalogue, sync ingest, series, dashboard, My Health tabs and devices.

## Does

- `POST /me/health/ingest`: idempotent upsert of 5-minute buckets (≤ 5,000)
- `POST /me/health/manual`: mood, weight, measurements, cuff BP
- Series, summaries, latest readings, dashboard + readiness score
- `GET /me/health/overview`, `GET /me/health/tabs/{tab}`
- `GET /me/devices`, `DELETE /me/devices/{id}`

## Owns tables

`metrics`, `health_readings`, `ingest_batches`, `devices`

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [04-database.md](../../../docs/04-database.md#44-health)
