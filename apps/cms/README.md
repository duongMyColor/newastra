This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Note: Create .env file base on .sample.env

# 1. Run app in local machine with Docker

## Make sure you install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

(Optional) Remove current MySQL container and `/mysql` folder if existed

## Run docker-compose At `react-admin` folder

`$ docker-compose -f docker-compose.local.yml up -d`

# 2. Run app in local machine without Docker

## Create DB (at `/react-admin` folder)

`$ docker-compose -f docker-compose.mysql.yml up -d`

`$ docker-compose -f docker-compose.arm64.mysql.yml up -d` (For Mac pc with M chip)

## Migrate DB (at `/react-admin` folder)

`$ npx prisma generate`

`$ npx prisma migrate dev`

## Add seed

`$ yarn prisma db seed`

## Run app (at `/react-admin` folder)

`$ yarn install`

`$ yarn dev`

# 3. App URL

- http://localhost:3000/

# 4. Default User: see `consts/user.ts`

# 5. Folder structure: see [project-structure.md](docs/project-structure.md)

# 6. CRUD creation instruction: [CRUD-scaffold.md](docs/CRUD-scaffold.md)
