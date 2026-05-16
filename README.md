# Job Tracker API: A Professional RESTful Backend Service

**Job Tracker API** is a robust backend service built with **Node.js**, **Express**, and **MongoDB** for tracking job applications, interviews, stages, analytics, and timelines, all with authentication, filtering, role-based access, and advanced metrics.

This API is designed for developers, job seekers, and portfolio reviewers. It demonstrates industry best practices, clean architecture, security, analytics, and extensibility.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT |
| Validation | express-validator |
| Deployment | Render |

---

## 🔍 Table of Contents

1. [Features](#features)
2. [Preview](#preview)  
3. [Getting Started](#getting-started)  
4. [Environment Variables](#environment-variables)  
5. [API Endpoints](#api-endpoints)  
6. [Filtering & Pagination](#filtering-and-pagination)  
7. [Analytics](#analytics)  
8. [Role-Based Access](#role-based-access)  
9. [Swagger Documentation](#swagger-documentation)  
10. [Project Structure](#project-structure)  
11. [Next Improvements](#next-improvements)  
12. [License](#license)

---

## 💡 Features

✔ Secure user registration & login via **JWT**  
✔ Job CRUD with **filtering and sorting**  
✔ Analytics (ghosting rate, stage totals, offers/month)  
✔ Timeline tracking for interviews and recruiter interactions  
✔ Role-based access control (admin vs. user)  
✔ Soft deletion (**archiving**) support  
✔ Email follow-up scheduling support  
✔ Pagination, validation, and error handling  
✔ Modular architecture with clear separation of concerns

---
## 🖼️ Preview
<img width="1822" height="918" alt="Job Tracker" src="https://github.com/user-attachments/assets/569d91e6-bc21-45da-89e1-354ddbddd8b9" />

---

## 🛠 Getting Started

### Clone Repository

```
git clone https://github.com/dBillionaire-Dev/Job_Tracker_API.git
cd Job_Tracker_API
````

### Install Dependencies

```
npm install
```

### Create `.env`

Create a `.env` file and add your configuration (see below).

---

## 🔐 Environment Variables

```env
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=your_mongo_connection_string

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# API Keys (if needed)
API_KEY=your_api_key

# Email Config for Follow-Ups
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

> **Replace `EMAIL_USER` and `EMAIL_PASS`** with your actual credentials. This configuration is not “dynamic”, it must be unique for your mail provider so the API can send emails.

---

## 📚 API Endpoints

### 📌 Auth

| Method | Path                 | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Create a new user |
| POST   | `/api/auth/login`    | Login and get JWT |

**Request Example (Register):**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePass123"
}
```

---

### 📌 Jobs

| Method | Path            | Description                 |
| ------ | --------------- | --------------------------- |
| POST   | `/api/jobs`     | Create a new job (auth)     |
| GET    | `/api/jobs`     | Get all jobs (with filters) |
| GET    | `/api/jobs/:id` | Get a single job            |
| PATCH  | `/api/jobs/:id` | Update a job                |
| DELETE | `/api/jobs/:id` | Soft delete job (archive)   |

**Filter Example:**

```
GET /api/jobs?stage=Interviewing&interestScore=5
```

---

## 🧠 Filtering and Pagination

Supports query params:

```
GET /api/jobs?stage=Interviewing&locationType=Remote&page=1&limit=10&sort=applyDate
```

---

## 📊 Analytics Routes

| Method | Path                            | Description                |
| ------ | ------------------------------- | -------------------------- |
| GET    | `/api/analytics/stats`          | Job counts by stage        |
| GET    | `/api/analytics/ghostingRate`   | Percentage of ghosted jobs |
| GET    | `/api/analytics/offersPerMonth` | Job offers/month           |

---

## 👥 Role-Based Access (RBAC)

Roles supported: `user`, `admin`

* Admins can manage all user jobs
* Regular users only manage their own

Example middleware:

```
if (req.user.role !== 'admin') {
  return res.status(403).json({ message: "Forbidden" });
}
```

---

## 🧾 Timeline Routes

Track interviews:

| Method | Path                   | Description            |
| ------ | ---------------------- | ---------------------- |
| POST   | `/api/timeline`        | Add timeline event     |
| GET    | `/api/timeline/:jobId` | Get all events for job |

---

## 🧭 Swagger / API Docs

Install Swagger UI:

```
npm install swagger-ui-express yamljs
```

Add to Express:

```
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
```

Your docs will be available at:

```
GET /api/docs
```

---

## 📁 Project Structure

```
job-tracker-backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── README.md
└── package.json
```

---

## 🚧 Next Improvements

✨ Add automated tests with Jest/Supertest
✨ Implement **Swagger examples** for every endpoint
✨ E2E tests & CI/CD pipeline
✨ OAuth2 (Google / GitHub login)

---

## 📜 License

Apache 2.0 License
Feel free to use this API in your own projects, expand it, or contribute!

---
