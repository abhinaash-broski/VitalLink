# Care

Planned, not built yet.

Medications and doses, user-tracked appointments, conditions and the emergency medical ID.

## Does

- `GET /me/medications`, `/today`, `PUT /me/medications/{id}/doses/{scheduled_for}`
- Appointments (a personal tracker, no booking), conditions and allergies
- `GET/PUT /me/emergency-profile`, emergency contacts (one primary)
- Reminders are local notifications on the phone; nightly marks missed doses

## Owns tables

`medications`, `medication_schedules`, `dose_logs`, `appointments`, `conditions`, `emergency_profiles`, `emergency_contacts`

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [04-database.md](../../../docs/04-database.md#46-records-and-care)
