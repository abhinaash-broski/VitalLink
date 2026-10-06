# Goals and insights

Planned, not built yet.

Goals, per-period progress, status, streaks and nightly insights.

## Does

- Goals CRUD; lifecycle set by the user, on-track / at-risk computed
- `GET /me/goals/overview`, `GET /me/streaks`
- Nightly: progress upsert, correlations (≥ 14 days, BH correction), trends
- `GET /me/insights`, dismiss

## Owns tables

`goals`, `goal_progress`, `insights`

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [04-database.md](../../../docs/04-database.md#45-training-nutrition-and-goals)
