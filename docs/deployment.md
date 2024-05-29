# CMS

## Deployment branch: `main`

- Dir: `apps/cms`

## 1. Create D1 Database

- `npx wrangler d1 create da-acsta-db`
- `da-acsta-db`: Database name

- Insert `database_name` and `database_id` from response into `wrangler.toml` file
## 2. Create R2 Bucket

## 2.1. Create bucket
- Go to [Cloudflare Dashboard](https://dash.cloudflare.com) 
- Select R2 on sidebar
- Click **Create bucket** button
- Enter your bucket name. Ex: **my-bucket**
- Click **Create bucket** button


## 2.2. Create R2 API Tokens for bucket
R2 API tokens can have full permission to interact with you data. But in this case, should specify tokens for specific bucket

- At R2 section. Select **Manage R2 API Tokens**
- Select **Create API token** button
- Enter token name
- Permissions: Select ***Object Read only: Allows the ability to read and list objects in specific buckets.*** to allow Read operation.
- Specify bucket(s): Select ***Apply to specific buckets only*** -> Select your bucket
- Click **Create API Token**
- Store all of your Token information in a safety place

## 2.3. Enable CORS
- At R2 section. Select your bucket you've created
- Navigate to **Settings** 
- Scroll to **CORS Policy** section -> **Add CORS policy**
- Enter following rules and save
```sh
[
  {
    "AllowedOrigins": [
      "*"
    ],
    "AllowedMethods": [
      "GET"
    ],
    "AllowedHeaders": [
      "*"
    ]
  }
]
```
- AllowedOrigins: After deployment, update the origins to the allowed origin you've deployed
- AllowedMethods: Allow GET Method
- AllowedHeaders: Allow all Headers

### Don't forget update `bucket_name` in `wrangler.toml` file

## 3. Migrate DB & seed DB

### 3.1: Migration
- To create local DB for migration
`yarn db:migrate apply`

- Create migration
`yarn db:migrate create`

- Apply the migration for local
`yarn db:migrate apply`

- Apply remote DB
`yarn db:migrate apply --remote`
- If you got error from selecting account_id. Go to step 4 and do again after sucess
### 3.2: Seed DB

- `yarn db:seed`

## 4. Deploy 

- `yarn deploy`

# API

- Dir: `apps/api`

## Make sure you enter correct `account_id`, `d1_databases`, `r2_buckets` in `wrangler.toml` file

## 1. Initialize deployment
- `yarn deploy`

## 2. Add enviroment vriable
- Go to CloudFlare Dashboard
- Select `Workers & Pages` on sidebar
- Select application `da-acsta-api` -> Settings -> Variables -> Add variable:

  - `CLOUDFLARE_ACCOUNT_ID`: your account_id
  - `CLOUDFLARE_ACCESS_KEY_ID`: access key from step 2.2
  - `CLOUDFLARE_SECRET_ACCESS_KEY`: secret key from step 2.2
  - `CLOUDFLARE_BUCKET_NAME`: your bucket name
  - `USERNAME`: your username using for Basic Authentication
  - `PASSWORD`: your password using for Basic Authentication

- Select deploy button to deploy again