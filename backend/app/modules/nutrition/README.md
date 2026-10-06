# Nutrition

Planned, not built yet.

Food search, meals with copied macros, hydration and daily totals against targets.

## Does

- `GET /foods/search` (trigram over the USDA subset + own foods), `POST /me/foods`
- Meals and hydration CRUD; macros copied at write time
- `GET /me/nutrition/day`, `GET/PUT /me/nutrition/targets`; base burn via Mifflin-St Jeor

## Owns tables

`foods`, `meal_entries`, `meal_items`, `hydration_logs`, `nutrition_targets`

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [04-database.md](../../../docs/04-database.md#45-training-nutrition-and-goals)
