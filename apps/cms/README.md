This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Note: Create .env file base on .sample.env
`npx wrangler login`

# 2. Run app in local machine without Docker

## Generate DB (at `/cms` folder)

`$ yarn db:migrate apply`


## Add seed local

- db_name: see `apps/cms/wrangler.toml`
- `npx wrangler d1 execute <db_name> --local --file=./prisma/seed.sql `

ex: 

`npx wrangler d1 execute da-acstar-db --local --file=./prisma/seed.sql`

## Add seed remote

- db_name: see `apps/cms/wrangler.toml`
- `npx wrangler d1 execute <db_name> --remote --file=./prisma/seed.sql `

ex: 

`npx wrangler d1 execute da-acstar-db --remote --file=./prisma/seed.sql`

# 3. App URL

- http://localhost:3000/

# 4. Default User: see `consts/user.ts`

# 5. Folder structure: see [project-structure.md](docs/project-structure.md)

# 6. CRUD creation instruction: [CRUD-scaffold.md](docs/CRUD-scaffold.md)
