# Overview
This is Monorepo using Turborepo as the management tool.

## 1. Install turborepo

`npm i -g turbo`

## 2. Install dependencies

`yarn install`

## 3. Create `.env` file base on `.sample.env` of each `apps`

## 4. Generate DB

`turbo run prisma-generate`

## 5. Migrate DB

Because of Prisma require interactive environment, so you need migrate each app manually
Go to each apps directory:

Ex: `cd apps/react-admin`

`npx prisma migrate dev`

### NOTE: If you migrate DB for react-admin-supabase app. You should follow `Missing grants` and `Create uploads` section in [README](apps\react-admin-supabase\README.md) to initialize the database

## 6. Run app in dev mode

### 6.1 react-admin

`yarn dev:react-admin`

### 6.2 react-admin-supabase

`yarn dev:react-admin-supabase`

## 7. Project structure
See [project-structure.md]('docs/project-structure.md')
