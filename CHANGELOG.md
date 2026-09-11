# Changelog

## Unreleased

- Added per-user sliding-window message limiting: 5 messages per rolling 10 seconds.
- Added client warnings when the message limit is reached.
- Removed public JWT retrieval and Redis JWT persistence.
- Added configurable client and server URLs and ports for local and production deployments.
- Added focused rate-limiter tests and updated authentication tests.