# Shipsy Assignment – System Architecture

## 1. Overview

This application is a **Shipment Management System** built to fulfill the Shipsy assignment requirements. It has:

* **Authentication** (JWT-based login)
* **CRUD** for a `Shipment` entity (text, enum, boolean, calculated field)
* **Pagination, filtering, search, sorting**
* **Protected API** and **Protected frontend routes**
* **Swagger API documentation**

## 2. Tech Stack

### Frontend
* Vite + React (JavaScript)
* Tailwind CSS for styling
* React Router for client-side routing
* React Query for server state management and caching

### Backend
* Node.js + Express.js
* MongoDB (Atlas) + Mongoose ORM
* JWT for authentication
* bcrypt for password hashing
* swagger-ui-express + YAML for API docs

## 3. Entity: `Shipment`

### Fields:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | String | ✅ | Text |
| `status` | Enum | ✅ | Values: `NEW`, `IN_TRANSIT`, `DELIVERED`, `CANCELLED` |
| `fragile` | Boolean | ✅ | True if fragile |
| `weightKg` | Number | ✅ | Used in cost calculation |
| `distanceKm` | Number | ✅ | Used in cost calculation |
| `baseRate` | Number | ✅ | Used in cost calculation |
| `cost` | Number | Auto | **Calculated** = `weightKg * baseRate + distanceKm * 0.5` |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

## 4. Module Breakdown

### Frontend (`apps/frontend/`)
* `Public/` - logo and Mp4
* `src/config/` - exports VITE_SERVER_URL
* `src/components/` – 
  * AllShipments, MyShipments, ShipmentTables, ShipmentActions, Create/Delete/Edit Shipment
  * Landing and Dashboard Section with Login and Signup using 
  * Pagination
  * ProtectedRoutes

### Backend (`apps/backend/`)
* `config/db.js` – Connects to MongoDB.
* `middleware/auth.js` – JWT validation.
* `models/`
  * `User.js` – User Schema
  * `Shipment.js` – Shipment schema.
* `routes/`
  * `Auth.js` – Login, Signup and fetch User with token.
  * `shipment.js` – CRUD operation on Shipment Schema.
* `index.js` – Starts server.

## 5. API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home Route |
| `/auth/login` | POST | Login route |
| `/auth/signup` | POST | SignUp route |
| `/auth/fetch` | GET | Fetch user data using token |
| `/shipment/` | GET | Get all the shipments |
| `/shipment/my` | GET | Get my shipments |
| `/shipment/:id` | GET | Get a particular shipment |
| `/shipment/` | POST | Create a shipment |
| `/shipment/:id` | PATCH | Update a shipment |
| `/shipment/:id` | DELETE | Delete a shipment |

## 6. Data Flow

### Login Flow:
1. User logs in via frontend `/login` → POST `/auth/login`.
2. Backend verifies credentials → returns JWT.
3. Frontend stores JWT in `localStorage`.
4. All future API requests include `Authorization: Bearer <token>`.

### CRUD Flow (example Create):
1. User fills shipment form → frontend sends POST `/shipments`.
2. Backend calculates `cost` server-side and saves to MongoDB.
3. Returns created shipment → React Query updates cache → UI updates.

## 7. Deployment Architecture

### Frontend
* Built with Vite → Deployed to **Vercel**.
* Environment variable: `VITE_SERVER_URL` points to backend URL.

### Backend
* Node.js + Express → Deployed to **Render**.
* Connected to **MongoDB Atlas**.
* Environment variables:
  * `MONGODB_URI`
  * `JWT_SECRET`
  * `PORT`

## 8. Security

* JWT for route protection.
* Passwords stored as bcrypt hashes.
* Pagination limits to prevent large query abuse.

## 9. Documentation

* **Swagger UI** available at `/docs` endpoint.
* AI usage logged in `docs/ai-usage.md` (≥ 6 prompts).
* Git commit history screenshot in `docs/commits.md`.
* Demo video link in `docs/video.md`.

## 10. Diagram

```
[Frontend: Vite+React]
        |
        v
[Backend: Express API] --- (Swagger UI /docs)
        |
        v
[MongoDB Atlas]
```