# Library

Planned, not built yet.

Health articles, the same for everyone, seeded from Markdown in `seeds/library/`. No admin UI and no per-user tracking.

## Does

- `GET /library`, `GET /library/articles/{slug}`, `GET /library/categories/{code}`

## Owns tables

`article_categories`, `articles`, `library_features`

## Planned files

`router.py` (HTTP) · `schemas.py` (Pydantic in/out) · `service.py` (rules, the only file other modules may import) · `repository.py` (queries on this module's tables) · `models.py` (SQLAlchemy)

Design: [04-database.md](../../../docs/04-database.md#47-notifications-and-library)
