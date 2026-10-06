# Training

Planned, not built yet.

Workouts, sets, plans, weekly load and personal records.

## Does

- Workouts CRUD (synced workouts de-dup on `source` + `external_id`)
- `GET /me/training`: week aggregate, sessions, muscle sets, records, next session, lifetime total
- Plans with planned sessions; one active plan per user
- `GET /exercises` (seeded catalogue)

## Owns tables

`exercises`, `workouts`, `exercise_sets`, `training_plans`, `plan_sessions`

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [04-database.md](../../../docs/04-database.md#45-training-nutrition-and-goals)
