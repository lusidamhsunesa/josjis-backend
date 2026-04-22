# Basic API 1 Entity with Express JS

[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#) [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#) [![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white)](#) [![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff)](#) [![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)](#) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/bluesky4047/api-express-users-ecommerce)

This project is intended as an experimental implementation using the Express.js framework, following industry standards through a modular architecture approach.

### How To Running this Project

1. Install current Dependency

   ```bash
   npm install
   ```

2. Config .env file from .env.example

   ```env
   # Server Configuration
   PORT=3000

   # Database connection URL
   DATABASE_URL="your_database_url_here"
   DIRECT_URL="your_direct_database_url_here"

   # Redis Configuration
   REDIS_URL="your_redis_url_here"
   REDIS_ENABLED=false
   REDIS_CACHE_TTL=60

   # Ratelimit Configuration
   RATE_LIMIT_WINDOW=10 # in minutes
   RATE_LIMIT_MAX=100 # max requests per window per IP

   # CORS Configuration
   CORS_ORIGIN="*"
   ```

3. Running Prisma Client

   ```bash
   npx prisma generate
   ```

   ```bash
   npx prisma migrate dev
   ```

4. Running Seed Database

   ```bash
   npm run user_seed
   ```

5. Choose Development or Production
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm run start
   ```

### Project Structure

```bash
├── prisma                  <-- ORM Folder
│   ├── schema.prisma
│   └── seed.js
├── resource                <-- Resource Postman and Database
│   ├── Camp 4.postman_collection.json
│   └── db.sql
├── src                     <-- Main Folder
│   ├── config              <-- All Config Source
│   │   └── db.config.js
│   ├── middlewares         <-- All Middlewares Source
│   │   ├── cors.js
│   │   └── rate.limiter.js
│   ├── modules             <-- All Modules Source
│   │   └── user
│   │       ├── user.controller.js
│   │       ├── user.repository.js
│   │       ├── user.route.js
│   │       ├── user.service.js
│   │       └── user.validation.js
│   ├── tests               <-- Testing Script
│   │   ├── app.test.js
│   │   └── user.test.js
│   ├── utils               <-- Utils to makes clean code
│   │   ├── cache.js
│   │   ├── redis.js
│   │   └── response.js
│   ├── app.js              <-- Main app code
│   └── server.js           <-- Server listen
├── package-lock.json
├── package.json
└── README.md
```

#### Note:

- Testing script are experimental
- Caching with redis are experimental but you can try it yourself

#### Resource :

- Live API : [live here](https://express-api-basic-1.rafn.tech)

- POSTMAN Documentation : [click here](https://documenter.getpostman.com/view/46893771/2sBXikori4)
