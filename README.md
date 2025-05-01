# 📱 Devices API

A simple, robust, and well-structured REST API for managing electronic devices, including validation, domain rules, full test coverage, and production-ready Docker deployment.

[![Deploy on Render](https://img.shields.io/badge/render-live-blue?logo=render)](https://devices-api.onrender.com)
[![Swagger](https://img.shields.io/badge/docs-swagger-blue.svg)](https://devices-api.onrender.com/api-docs)
[![Tests](https://img.shields.io/badge/tests-92%25-brightgreen)](#tests)
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](#)

---

## ✨ Features

- ✅ Clean Architecture (Domain, Application, Infra, Presentation)
- 🔐 Business rules encapsulated in the domain layer
- 🔄 CRUD operations for devices
- 🛡 Input validation with **Zod**
- 📄 Swagger auto-generated documentation
- 🛡️ Helmet + CORS + Rate Limiting
- ❤️ Error handling with centralized `AppError` class
- ⚙️ Healthcheck endpoint at `/health`
- ✅ 92%+ test coverage with **Jest** and **Supertest**
- 🐳 Dockerized
- ☁️ Deployed live on **Render**

---

## 📚 Documentation

- **Live API:** https://devices-api.onrender.com
- **Swagger UI:** https://devices-api.onrender.com/api-docs  
  > You can explore and test all routes directly in the browser.

> ⚠️ This API is hosted on a free Render instance.  
> It **sleeps after inactivity** and may take **~50s to wake up** on first request.

---

## 🧪 Tech Stack

- **Node.js + TypeScript**
- **Express** (HTTP Server)
- **Prisma ORM** with SQLite
- **Zod** (schema validation)
- **Jest** and **Supertest** (unit/integration tests)
- **Swagger-jsdoc** + **swagger-ui-express**
- **Docker** (multi-stage build)
- **Render** (deployment)

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/vcantelli/devices-api.git
cd devices-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the root (optional, defaults are safe):

```env
PORT=3000
DATABASE_URL="file:./dev.db"
```

### 4. Run migrations & generate Prisma client

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the app

```bash
npm run dev
```

### 6. Run tests

```bash
npm test
```

To check test coverage:

```bash
npm run test:coverage
```

---

## 🧪 API Endpoints (Overview)

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | `/devices`             | List all devices                |
| POST   | `/devices`             | Create new device               |
| GET    | `/devices/:id`         | Get device by ID                |
| PATCH  | `/devices/:id`         | Update device (partial/full)    |
| DELETE | `/devices/:id`         | Delete device (if not in-use)   |
| GET    | `/devices/brand/:brand`| Filter by brand                 |
| GET    | `/devices/state/:state`| Filter by state (available...)  |

> Check full documentation at [Swagger UI](https://devices-api.onrender.com/api-docs)

---

## 🛠 Possible Improvements

- 🔄 **Pagination** on `GET /devices` for better scalability
- 🧑‍💻 Authentication layer (JWT or OAuth)
- 🗃 Swap SQLite for PostgreSQL or other production-ready DB
- 💾 Add caching layer (e.g. Redis) for frequent reads
- 📊 Metrics and monitoring (e.g. Prometheus + Grafana)
- ☁️ CI/CD pipeline (e.g., GitHub Actions for tests and deploy)

---

## 📜 License

MIT © [Victor Cantelli](https://github.com/vcantelli)
