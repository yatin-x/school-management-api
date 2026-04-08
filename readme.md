# School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** to manage school data. Supports adding schools and retrieving them sorted by proximity to a user-specified location using the Haversine formula.

---

## 🚀 Live API

```
Base URL: https://school-management-api-brzo.onrender.com

```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MySQL
- **Distance Algorithm:** Haversine Formula

---

## 📁 Project Structure

```
school-management-api/
├── src/
│   ├── config/
│   │   ├── db.js              # MySQL connection pool
│   │   └── initDb.js          # Database & table initializer
│   ├── controllers/
│   │   └── school.controller.js  # Business logic
│   ├── routes/
│   │   └── school.routes.js   # Route definitions
│   └── app.js                 # Express app entry point
├── .env.example
├── .gitignore
└── package.json
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/yatin-x/school-management-api.git
cd school-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=school_db
PORT=3000
```

### 4. Initialize the database

```bash
node src/config/initDb.js
```

### 5. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs at `http://localhost:3000`

---

## 📡 API Endpoints

### Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "uptime": 123.45
}
```

---

### Add School

```
POST /api/addSchool
```

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurugram, Haryana",
  "latitude": 28.4089,
  "longitude": 77.0422
}
```

**Success Response `201`:**
```json
{
  "message": "School added successfully"
}
```

**Validation Error `400`:**
```json
{
  "error": "All fields are required"
}
```

**Validation Rules:**
- All fields (`name`, `address`, `latitude`, `longitude`) are required
- `name` and `address` must be non-empty strings
- `latitude` must be a number between `-90` and `90`
- `longitude` must be a number between `-180` and `180`

---

### List Schools

```
GET /api/listSchools?latitude={lat}&longitude={lng}
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| latitude | Float | Yes | User's current latitude |
| longitude | Float | Yes | User's current longitude |

**Example Request:**
```
GET /api/listSchools?latitude=28.4501&longitude=77.5840
```

**Success Response `200`:**
```json
{
  "schools": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 45, Gurugram, Haryana",
      "latitude": 28.4089,
      "longitude": 77.0422,
      "distance": 53.17
    },
    {
      "id": 2,
      "name": "Ryan International School",
      "address": "Sector 40, Gurugram, Haryana",
      "latitude": 28.4595,
      "longitude": 77.0266,
      "distance": 54.50
    }
  ]
}
```

Schools are sorted by `distance` (in km) from the user's location, nearest first.

---

## 📐 Distance Calculation

Uses the **Haversine Formula** to calculate great-circle distance between two coordinates on Earth's surface, accounting for the planet's curvature.

```js
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE schools (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  address   VARCHAR(255) NOT NULL,
  latitude  FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

---

## 🧪 Postman Collection

Import and test all endpoints using the Postman collection:

👉 [View Postman Collection](#) ← *(replace with your shared link)*

The collection includes:
- Add School (success case)
- List Schools (from multiple locations)
- Health Check

---

## 📋 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `password` |
| `DB_NAME` | Database name | `school_db` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | Full connection string (production) | `mysql://user:pass@host:port/db` |

---

## 👨‍💻 Author

**Yatin Singh**  
GitHub: [@yatin-x](https://github.com/yatin-x)