# Neon Database Integration(Crud operations) - Backend Project

A **Node.js Express server** integrated with **Neon PostgreSQL database** for managing user profiles. This project demonstrates REST API development with TypeScript and PostgreSQL integration.

---

## 📋 Project Overview

This is an intermediate-level backend project that provides a complete user management system with CRUD (Create, Read, Update, Delete) operations. The server connects to Neon (a serverless PostgreSQL provider) and provides RESTful API endpoints.

**Key Features:**
- User profile creation and management
- PostgreSQL database with Neon
- Type-safe TypeScript implementation
- RESTful API with Express.js
- Error handling and validation
- Automatic table creation on server start

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **TypeScript** | Type-safe JavaScript |
| **PostgreSQL (Neon)** | Database |
| **pg** | PostgreSQL client for Node.js |
| **tsx** | TypeScript execution for development |
| **dotenv** | Environment variable management |

---

## 📦 Project Structure

```
├── src/
│   ├── server.ts              # Main server file
│   ├── config/
│   │   └── db.ts              # Database connection & pool setup
│   ├── controllers/
│   │   └── userControllers.ts # Business logic for user operations
│   └── routes/
│       └── userRoutes.ts       # API route definitions
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
└── redmi.md                   # Documentation (this file)
```

---

## 🚀 Getting Started

### Step 1: Clone & Install Dependencies

```bash
# Install all dependencies
npm install
```

### Step 2: Setup Neon PostgreSQL Database

#### Create a Neon Account:
1. Go to [Neon Console](https://console.neon.tech)
2. Sign up for a free account
3. Create a new project

#### Get Your Connection String:
1. In Neon dashboard, go to **Connection Details**
2. Select **Node.js** as the driver
3. Copy the full connection string (it looks like):
   ```
   postgresql://user:password@ep-xxxx.region.neon.tech/dbname?sslmode=require
   ```

### Step 3: Setup Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NEON_URI=postgresql://user:password@ep-xxxx.region.neon.tech/dbname?sslmode=require
```

**Note:** Replace with your actual Neon connection string from step 2.

### Step 4: Run the Server

#### Development Mode (with hot reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm run build
npm start
```

The server will:
- Start on `http://localhost:3000`
- Automatically create the `user_profiles` table
- Display: `✅ Neon PostgreSQL Connected`

---

## 📊 Database Schema

The `user_profiles` table is automatically created with:

```sql
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns:**
- `id` - Auto-incrementing primary key
- `name` - User's full name (required)
- `email` - User's email (required, unique)
- `password` - User's password (required)
- `is_active` - Account status (default: true)
- `age` - User's age (optional)
- `created_at` - Creation timestamp (auto)
- `updated_at` - Last update timestamp (auto)

---

## 🔌 API Endpoints

### Base URL: `http://localhost:3000/api`

### 1. **Create User** (POST)
```
POST /api/users
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "age": 28,
  "is_active": true
}
```

**Response (201 - Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "age": 28,
    "is_active": true,
    "created_at": "2026-05-17T10:30:00Z",
    "updated_at": "2026-05-17T10:30:00Z"
  }
}
```

---

### 2. **Get All Users** (GET)
```
GET /api/users
```

**Response (200 - OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "secure123",
      "age": 28,
      "is_active": true,
      "created_at": "2026-05-17T10:30:00Z",
      "updated_at": "2026-05-17T10:30:00Z"
    }
  ]
}
```

---

### 3. **Get User by ID** (GET)
```
GET /api/users/:id
```

**URL Parameter:**
- `id` - User's ID (e.g., `/api/users/1`)

**Response (200 - OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "age": 28,
    "is_active": true,
    "created_at": "2026-05-17T10:30:00Z",
    "updated_at": "2026-05-17T10:30:00Z"
  }
}
```

**Error Response (404 - Not Found):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

### 4. **Update User by ID** (PUT)
```
PUT /api/users/:id
```

**URL Parameter:**
- `id` - User's ID (e.g., `/api/users/1`)

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "password": "newpassword123",
  "age": 29,
  "is_active": true
}
```

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "password": "newpassword123",
    "age": 29,
    "is_active": true,
    "created_at": "2026-05-17T10:30:00Z",
    "updated_at": "2026-05-17T11:45:00Z"
  }
}
```

---

### 5. **Delete User by ID** (DELETE)
```
DELETE /api/users/:id
```

**URL Parameter:**
- `id` - User's ID (e.g., `/api/users/1`)

**Response (200 - OK):**
```json
{
  "success": true,
  "message": "User Delete successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "age": 28,
    "is_active": true,
    "created_at": "2026-05-17T10:30:00Z",
    "updated_at": "2026-05-17T10:30:00Z"
  }
}
```

**Error Response (404 - Not Found):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

## ✅ Input Validation

**Required Fields for User Creation:**
- `name` (string) - User's name
- `email` (string) - User's email
- `password` (string) - User's password

**Error Response (400 - Bad Request):**
```json
{
  "success": false,
  "error": "Name, email, and password are required"
}
```

---

## 🧪 Testing with cURL

### Create User:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith",
    "email": "alice@example.com",
    "password": "pass123",
    "age": 25,
    "is_active": true
  }'
```

### Get All Users:
```bash
curl http://localhost:3000/api/users
```

### Get User by ID:
```bash
curl http://localhost:3000/api/users/1
```

### Update User:
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Updated",
    "email": "alice.updated@example.com",
    "password": "newpass123",
    "age": 26,
    "is_active": true
  }'
```

### Delete User:
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

---

## 🔐 Security Notes

⚠️ **Important:** This is a learning project. For production:
- Hash passwords using `bcrypt` or similar
- Add JWT authentication
- Validate and sanitize all inputs
- Use environment variables for sensitive data
- Implement rate limiting
- Add HTTPS/SSL

---

## 📝 Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
```

---

## 🐛 Troubleshooting

### Connection Error:
```
❌ Database connection failed
```
**Solution:** Check your `.env` file and ensure `NEON_URI` is correct.

### Port Already in Use:
```
Error: listen EADDRINUSE :::3000
```
**Solution:** Change PORT in `.env` or kill the process using port 3000.

### Table Not Created:
**Solution:** Restart the server or check PostgreSQL credentials.

---

## 📚 Learning Objectives

This project covers:
- ✅ Express.js API development
- ✅ TypeScript type safety
- ✅ PostgreSQL database integration
- ✅ CRUD operations
- ✅ Error handling
- ✅ REST API conventions
- ✅ Environment configuration
- ✅ Neon serverless PostgreSQL

---

## 📖 Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js pg Library](https://node-postgres.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👤 Author
Developed by Fahad moaj. Feel free to contribute or ask questions! moajfahad@gmail.com

**Version:** 1.0.0

---

**Happy Coding! 🚀**
