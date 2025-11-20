# Pokémon Pokédex Backend

This is a NestJS backend for a Pokédex focused on the original 151 Pokémon. It uses PostgreSQL + TypeORM.

## Project layout (key folders)

- `src/modules/pokemon` - Pokémon entities, DTOs, service, controller
- `src/modules/team` - Team management (CRUD, team-pokemon relation)
- `src/database` - TypeORM datasource and migrations
- `src/cli` - CLI import scripts
- `src/external` - External integration (PokéAPI)
- `src/common` - shared guards and utilities

## Quick start (local)

1. Copy `.env.example` to `.env` and set DB credentials.
2. Start PostgreSQL (docker-compose recommended):

```bash
docker-compose up -d db
```

3. Install deps:

```bash
npm install
```

4. Run migrations:

```bash
npm run typeorm:migrate
```

5. Start the app:

```bash
npm run start
```

API served at `http://localhost:3000/api`.

## Import commands

- Import a JSON dump:

```bash
npm run import:seed -- ./dump.json
```

- Import one Pokémon by id or name from PokéAPI:

```bash
npm run import:pokemon -- 25
npm run import:pokemon -- pikachu
```

## Authentication for Team routes

Team modification routes require header:

```
Authorization: Bearer SECRET123
```

Change the token via `TEAM_API_TOKEN` env var.

## Notes

- TypeORM is used for migrations and entity mapping.
- `axios` is used to fetch PokéAPI.
- `class-validator` + DTOs are used for request validation.

