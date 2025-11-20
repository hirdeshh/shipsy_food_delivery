# AI Usage in Shipsy Project

This document records how **Gemini CLI** assisted the development of the Shipsy project. Each entry includes the prompt used, the AI-generated response, and a detailed description of how the output was applied, refined, or adapted in the project.

## 1. Project Structure Planning

**Prompt:**
> "Given the Shipsy assignment PDF, suggest a modular monorepo folder structure for Vite + React frontend and Express + MongoDB backend including CRUD, pagination, sorting, JWT auth, and file uploads."

**Response:**
Gemini recommended a clear separation between frontend and backend, with folders like:

```
/apps
  /frontend (Vite + React + Tailwind + Framer Motion)
    /src/components/
    /src/config/
    /Public/
  /backend (Express + MongoDB + routes + models + middleware)
  /docs
```

It also suggested grouping files by functionality — components, config, and public assets in frontend; models, routes, and middleware in backend.

**Use:**
I followed this structure strictly. It helped me separate concerns between UI logic and backend logic, which made both development and testing easier. Components for shipment CRUD, dashboards, and ProtectedRoutes were organized inside `src/components/`, and API URLs and environment variables were centralized in `src/config/`. Backend routes and models were cleanly separated, enabling faster iteration and easier debugging.

## 2. Backend CRUD Routes

**Prompt:**
> "Write Express.js CRUD routes for a Shipment model with fields: title, status (enum), fragile (boolean), weightKg, distanceKm, baseRate, and calculated cost. Include pagination, filtering, search, and sorting."

**Response:**
Gemini produced a scaffold for `routes/shipment.js` with typical CRUD endpoints (POST, GET, PATCH, DELETE). It included Mongoose queries with pagination and an initial sorting approach. Example code included:

```javascript
Shipment.find(query)
  .skip(page * limit)
  .limit(limit)
  .sort(sortObj)
```

**Use:**
I used Gemini's scaffold as a starting point. Then I integrated JWT protection, refined error handling with proper HTTP status codes, and ensured cost calculation was computed server-side. Pagination, filtering, and search functionality were adjusted to match project requirements exactly.

## 3. Auth Routes & JWT

**Prompt:**
> "Create Express routes for signup, login, and fetch user data with JWT authentication."

**Response:**
Gemini suggested a secure structure for `routes/Auth.js` with password hashing using bcrypt, JWT token creation for login, and verification middleware for protected routes. Example:

```javascript
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
```

**Use:**
I implemented `/auth/login`, `/auth/signup`, and `/auth/fetch` exactly according to this recommendation. Token validation logic was used in the backend and matched the frontend ProtectedRoutes, ensuring secure access to shipment management features.

## 4. React Dashboard with Protected Routes

**Prompt:**
> "Generate a React dashboard layout with protected routes that redirect to login if JWT token is missing."

**Response:**
Gemini provided a ProtectedRoute component that wraps dashboard content. It also included a basic dashboard skeleton with placeholder sections for shipment lists, create/update forms, and user actions.

**Use:**
This helped structure the frontend. I created ProtectedRoutes in `src/components/` and used it to guard the dashboard, shipment forms, and other authenticated pages. Redirect logic ensures unauthenticated users cannot access sensitive sections.

## 5. File Upload Middleware

**Prompt:**
> "Write Express middleware for handling PDF, thumbnail, and video uploads using multer + Cloudinary."

**Response:**
Gemini generated `uploadFile.js` with multi-field upload handling, file type validation, and Cloudinary integration. The middleware handled PDFs for shipment documents, thumbnails for visual previews, and videos for optional content.

**Use:**
I integrated this middleware in `/shipment` POST and PATCH routes, ensuring uploaded files are properly validated and stored. This feature aligns directly with the assignment requirements.

## 6. Backend Sorting & Filtering

**Prompt:**
> "Enhance Express list routes to support dynamic filtering, search, and sorting via query parameters."

**Response:**
Gemini suggested parsing query parameters like:

```javascript
const sortObj = {};
if(sort) { 
  const [field, dir] = sort.split(':'); 
  sortObj[field] = dir === 'asc' ? 1 : -1; 
}
```

**Use:**
Implemented in `/shipment/` GET routes to allow the frontend to request sorted, filtered, or searched lists. I adapted the code to handle missing parameters gracefully and combined multiple filters in a single query for better performance.

## 7. React Form with Validation

**Prompt:**
> "Generate a React form using react-hook-form + zod that creates or updates shipments including all fields and optional file upload preview."

**Response:**
Gemini suggested a controlled form with field validation, live preview for uploads, and form state management.

**Use:**
I created CreateBook and UpdateBook components in frontend `src/components/` (matching your code). Forms include field validation, file previews for PDFs, thumbnails, and videos, and integrate with backend API calls.

## 8. Pagination Component

**Prompt:**
> "Create a reusable React pagination component that works with API data and shows next/prev buttons plus page numbers."

**Response:**
Gemini provided `Pagination.jsx` logic managing currentPage, totalPages, and handling click events for navigation.

**Use:**
Used in shipment lists to navigate paginated backend responses. The design integrates Tailwind styling and works with React state to dynamically update the displayed page.

## 9. Toast Notifications

**Prompt:**
> "Implement React toast notifications using react-toastify for success and error messages in form submissions."

**Response:**
Gemini returned examples using react-toastify:

```javascript
import { toast } from 'react-toastify';
toast.success('Shipment created successfully');
toast.error('Error creating shipment');
```

**Use:**
Added to all form submissions and API calls. Ensures users get immediate feedback on success or failure, improving UX and debugging.

## 10. Loading Skeletons

**Prompt:**
> "Generate loading skeletons for shipment lists and forms in React using Tailwind CSS."

**Response:**
Gemini suggested reusable `<Skeleton />` components with shimmer animations for rows, form inputs, and buttons.

**Use:**
Displayed while awaiting API responses. This improves perceived performance and avoids showing blank pages.

## 11. Dashboard Animations

**Prompt:**
> "Enhance frontend dashboard with Framer Motion animations for hover effects, page transitions, and interactive buttons."

**Response:**
Gemini provided motion wrappers for divs, buttons, modals, and transitions for page changes.

**Use:**
Integrated into dashboard sections and components like buttons, modals, and shipment cards to create smooth animations, hover effects, and better interactivity.

## 💡 Summary

All 11 prompts were used as foundations to accelerate feature development, reduce boilerplate, and ensure best practices. Gemini's suggestions were adapted to match the actual Shipsy code, including:

- `react-toastify` instead of `react-hot-toast`
- Protected routes using `ProtectedRoutes`
- File upload middleware for PDFs, thumbnails, and videos
- Backend CRUD routes for shipments matching assignment requirements

---

**AI Tool Used:** Gemini CLI  
**Project:** Shipsy - Shipment Management System 