# API Josjis Open Source

[![Trello](https://img.shields.io/badge/Trello-0052CC?logo=trello&logoColor=fff)](#) [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#) [![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff)](#) [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](#) [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#) [![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white)](#) [![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#) [![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#) [![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)](#) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/lusidamhsunesa/josjis-backend)

This project is intended as an implementation using the Express.js framework, following industry standards through a modular architecture approach.

### How To Running this Project

1. Config .env file from .env.example

   ```bash
   cp .env.example .env
   ```

   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV="dev"

   # JWT Configuration
   JWT_SECRET="your_jwt_secret_key"

   # Cookie Configuration in hours
   ACCESS_TOKEN_EXPIRES_IN=1
   REFRESH_TOKEN_EXPIRES_IN=168 # 7 days
   GUEST_ID_EXPIRES_IN=720 # 30 days
   ADMIN_TOKEN_EXPIRES_IN=1

   # Database connection URL
   DATABASE_URL="your_database_url_here"
   DIRECT_URL="your_direct_database_url_here"

   # Redis Configuration
   REDIS_HOST="your_redis_host_here"
   REDIS_PORT=16326
   REDIS_USERNAME="your_redis_username_here"
   REDIS_PASSWORD="your_redis_password_here"
   REDIS_ENABLED=false
   REDIS_CACHE_TTL=60

   # Ratelimit Configuration
   RATE_LIMIT_WINDOW=10
   RATE_LIMIT_MAX=100

   # CORS Configuration
   CORS_ORIGIN="*"

   # S3 Configuration
   S3_ENDPOINT=your_s3_endpoint_here
   S3_REGION=your_s3_region_here
   S3_ACCESS_KEY=your_s3_access_key_here
   S3_SECRET_KEY=your_s3_secret_key_here
   S3_BUCKET=your_s3_bucket_name_here

   PUBLIC_URL=your_public_url_here

   # Image Processing Configuration
   IMAGE_MAX_SIZE=200 # in KB
   IMAGE_QUALITY=80
   IMAGE_UPLOAD_SIZE_LIMIT=3 # in MB

   # Admin Credentials
   ADMIN_NAME="Admin"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="admin_password_here"

   # Midtrans Configuration
   MIDTRANS_SERVER_KEY=your_midtrans_server_key_here
   MIDTRANS_WEBSITE_ID=your_midtrans_website_id_here
   ```

2. Install current Dependency

   ```bash
   npm install
   ```

3. Running Prisma Client

   ```bash
   npx prisma generate
   ```

   ```bash
   npx prisma migrate dev
   ```

4. Choose Development or Production
   - Development
     ```bash
     npm run dev
     ```
   - Production
     ```bash
     npm run start
     ```

### Project Structure

```bash
├── prisma                  <-- ORM Folder
│   ├── schema.prisma
│   └── seed.js
├── resource                <-- Resource Postman and Database
│   ├── API_JosJis_v1.postman_collection.json
│   └── db.sql
├── src                     <-- Main Folder
│   ├── config              <-- All Config Source
│   │   ├── admin.credential.js
│   │   ├── cookiesDuration.config.js
│   │   ├── db.config.js
│   │   ├── env.check.js
│   │   ├── logger.config.js
│   │   ├── redis.config.js
│   │   ├── s3.config.js
│   │   └── sharp.config.js
│   ├── middlewares         <-- All Middlewares Source
│   │   ├── auth.middleware.js
│   │   ├── authRole.middleware.js
│   │   ├── cache.middleware.js
│   │   ├── cors.js
│   │   ├── handleUpdloadError.js
│   │   ├── logger.js
│   │   ├── rate.limiter.js
│   │   └── upload.middleware.js
│   ├── modules             <-- All Modules Source
│   │   ├── auth
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.repository.js
│   │   │   ├── auth.route.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   ├── order
│   │   │   ├── order.controller.js
│   │   │   ├── order.repository.js
│   │   │   ├── order.route.js
│   │   │   ├── order.service.js
│   │   │   └── order.validation.js
│   │   ├── payment
│   │   │   ├── payment.controller.js
│   │   │   ├── payment.repository.js
│   │   │   ├── payment.route.js
│   │   │   ├── payment.service.js
│   │   │   └── payment.validation.js
│   │   ├── products
│   │   │   ├── products.controller.js
│   │   │   ├── products.dto.js
│   │   │   ├── products.repository.js
│   │   │   ├── products.route.js
│   │   │   ├── products.service.js
│   │   │   └── products.validation.js
│   │   ├── rating
│   │   │   ├── rating.controller.js
│   │   │   ├── rating.repository.js
│   │   │   ├── rating.route.js
│   │   │   ├── rating.service.js
│   │   │   └── rating.validation.js
│   │   ├── table
│   │   │   ├── table.controller.js
│   │   │   ├── table.repository.js
│   │   │   ├── table.route.js
│   │   │   ├── table.service.js
│   │   │   └── table.validation.js
│   │   └── webhook
│   │       ├── webhook.controller.js
│   │       ├── webhook.repository.js
│   │       ├── webhook.route.js
│   │       └── webhook.service.js
│   ├── utils               <-- Utils to makes clean code
│   │   ├── cache.js
│   │   ├── cookies.js
│   │   ├── jwt.js
│   │   ├── midtrans.token.js
│   │   ├── response.js
│   │   └── s3.js
│   ├── app.js              <-- Main app code
│   └── server.js           <-- Server listen
├── package-lock.json
├── package.json
└── README.md
```

### API Request Documentation

#### Admin login

POST /api/auth/admin/login

```json
{
  "email": "admin@example.com",
  "password": "admin_password_here"
}
```

#### Admin endpoint (Protected)

1. Get Admin 🔒 : GET /api/auth/admin/me

   ```javascript
   headers: {
      'Cookie': 'access_token=your_access_token'
   }
   ```

2. Get Admin Refresh Token : GET /api/auth/admin/refresh-token

   ```javascript
   headers: {
      'Cookie': 'refresh_token=your_refresh_token'
   }
   ```

3. Logout Admin : POST /api/auth/admin/logout

   ```javascript
   headers: {
      'Cookie': 'access_token=your_access_token'
   }
   ```

#### User endpoint

#### Note:

#### Resource :

- Live API : [live here](https://josjis-fnb.rafn.tech)

- POSTMAN Documentation : [click here](https://documenter.getpostman.com/view/46893771/2sBXqGr1vT)
