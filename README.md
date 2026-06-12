# 🚀 Product Manager API — Backend Intern Assignment

A **Scalable REST API** with JWT Authentication, Role-Based Access Control, and a React frontend.

## 🛠️ Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Backend   | Node.js, Express.js           |
| Database  | MongoDB + Mongoose            |
| Auth      | JWT + bcryptjs                |
| Frontend  | React.js (Vite)               |

---

## ⚡ Setup & Run

### Backend

```bash
cd backend
npm install
# Make sure MongoDB is running
npm run dev
```

Server starts at: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 📁 Project Structure

```
backend/
├── config/         # DB connection
├── controllers/    # Business logic
├── middleware/     # JWT auth & role guard
├── models/         # Mongoose schemas
├── routes/         # API routes
├── .env            # Environment variables
└── server.js       # Entry point

frontend/
└── src/
    ├── pages/      # Login, Register, Dashboard
    ├── App.jsx     # Page routing
    └── index.css   # Styles
```

---

## 🔐 API Documentation

### Auth Routes — `/api/v1/auth`

| Method | Endpoint    | Access  | Description       |
|--------|-------------|---------|-------------------|
| POST   | `/register` | Public  | Register new user |
| POST   | `/login`    | Public  | Login & get token |
| GET    | `/me`       | Private | Get current user  |

**Register Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user"
}
```

**Login Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

### Product Routes — `/api/v1/products`

All routes require: `Authorization: Bearer <token>`

| Method | Endpoint  | Access       | Description          |
|--------|-----------|--------------|----------------------|
| GET    | `/`       | User + Admin | Get all products     |
| GET    | `/:id`    | User + Admin | Get single product   |
| POST   | `/`       | User + Admin | Create product       |
| PUT    | `/:id`    | User + Admin | Update product       |
| DELETE | `/:id`    | Admin only   | Delete product       |

**Create/Update Body:**
```json
{
  "name": "iPhone 15",
  "description": "Latest Apple smartphone",
  "price": 79999,
  "category": "Electronics",
  "stock": 50
}
```

---

## 🔒 Security Features

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- **JWT tokens** expire in 7 days
- **Role-based access**: DELETE restricted to admins
- Input validation on all endpoints
- CORS enabled

---

## 📈 Scalability Notes

- **Modular structure**: Controllers, routes, models are separated for easy scaling
- **API versioning** (`/api/v1/`) allows future versions without breaking changes
- Can add **Redis caching** for GET /products in production
- Stateless JWT auth supports **horizontal scaling** (multiple server instances)
- Can be **Dockerized** for container deployment
- Supports **microservices migration**: auth and products can be split into separate services

---

## 🌐 Postman Collection

Import the following requests into Postman:

1. `POST http://localhost:5000/api/v1/auth/register`
2. `POST http://localhost:5000/api/v1/auth/login` → copy token
3. Set Header: `Authorization: Bearer <token>`
4. `GET http://localhost:5000/api/v1/products`
5. `POST http://localhost:5000/api/v1/products`
6. `PUT http://localhost:5000/api/v1/products/:id`
7. `DELETE http://localhost:5000/api/v1/products/:id` (admin only)
