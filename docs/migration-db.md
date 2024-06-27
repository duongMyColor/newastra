# Migrate DB & seed DB

## Migration

### To create local DB for migration

```bash
yarn db:migrate apply
```

### Create migration

```bash
yarn db:migrate create
```

### Apply the migration for local

```bash
yarn db:migrate apply
```

### Apply remote DB

```bash
yarn db:migrate apply --remote
```

> [!NOTE]
> If you got error from selecting account_id. Go to step 4 and do again after sucess

## Seed DB

```bash
yarn db:seed
```