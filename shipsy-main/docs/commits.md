# 📦 Shipsy - Commit History

This document provides a comprehensive overview of all commits in the Shipsy project, showcasing the development journey from initial setup to the current state.

## Project Overview

Shipsy is a shipment management application built with a modern tech stack, featuring user authentication, shipment CRUD operations, and a responsive dashboard interface.

## Complete Commit History

| Date | Commit ID | Title | Description | Category |
|------|-----------|-------|-------------|----------|
| 2025-08-16 | 0989528 | set itemperpage to 5 | Updated table pagination to display 5 items per page | UI/UX |
| 2025-08-16 | aa8615d | personalized sipmentTable based on MyShipmentData and AllShipmentData | Customized shipment table for user-specific and all shipments view | Feature |
| 2025-08-16 | 9a59614 | synced refetched of data on create and edit of shipment | Ensured UI refreshes automatically after creating or editing a shipment | Backend |
| 2025-08-16 | 77d87c4 | add Loading Skeleton to MyShipment component | Added skeleton loader to improve user experience while data loads | UI/UX |
| 2025-08-16 | e46e8a1 | added Loading Skeleton and Integrated CreateShipmentModal | Combined loading skeleton with modal for creating shipments | UI/UX |
| 2025-08-16 | 1746b30 | Landing footer changing and auth bug fixes | Updated landing page footer and fixed authentication bugs | Bug Fix |
| 2025-08-16 | 5653ecc | added ai-usages.md file | Documented AI usage for project development | Documentation |
| 2025-08-16 | 8c27ce6 | add architecture.md file | Added system architecture document for project reference | Documentation |
| 2025-08-16 | 8883f1c | removed Vercel Analyst | Removed unnecessary Vercel Analytics import | Cleanup |
| 2025-08-16 | 57e840e | solved single page app + vercel deployment issue and enabled vercel analyst | Fixed SPA routing issue on Vercel and re-enabled analytics | Deployment |
| 2025-08-15 | 9d3ed11 | add logout logic | Implemented user logout functionality | Authentication |
| 2025-08-15 | c13803a | connected backend with DeleteShipmentModal | Integrated delete shipment API with frontend modal | Backend |
| 2025-08-15 | fda5dc9 | connected backend with EditShipmentModal | Integrated edit shipment API with frontend modal | Backend |
| 2025-08-15 | bb56f06 | connected Backed to CreateShipmentModal component | Linked create shipment modal to backend API | Backend |
| 2025-08-15 | 22b47ec | connected Backend with MyShipment | Connected user's shipment list to backend API | Backend |
| 2025-08-15 | 45412f1 | connected Backend with AllShipments | Connected all shipments table to backend API | Backend |
| 2025-08-15 | 58f924d | connected the backend with the Dashboardstats | Fetched shipment statistics from backend for dashboard | Backend |
| 2025-08-15 | 68992a9 | connected backend with Dashboard Navbar | Populated dashboard navbar with user-specific data | Backend |
| 2025-08-15 | d951938 | Connected Backend to Landing Page and imported Cors to the backend | Added API access for landing page and enabled CORS | Backend |
| 2025-08-15 | 0b81278 | add EditShipmentModal | Added modal component to edit shipments | Feature |
| 2025-08-15 | a656f5b | added more routes | Expanded backend API routes for shipments and users | Backend |
| 2025-08-15 | 8615374 | added cursor-pointer to the dashboard | Improved UX by adding pointer cursor to interactive elements | UI/UX |
| 2025-08-15 | 3e34d4e | added createShipmentModal | Added modal component to create shipments | Feature |
| 2025-08-15 | f185a33 | add createShipmentModal | Linked frontend modal for creating shipments | Feature |
| 2025-08-15 | f5b685e | add My Shipment and All Shipment | Added components for viewing user-specific and all shipments | Feature |
| 2025-08-15 | 6085ea2 | UI changes in the dashboard | Made visual improvements to dashboard layout and styling | UI/UX |
| 2025-08-14 | 27f93ab | add logo and dashboard | Added project logo and initial dashboard layout | UI/UX |
| 2025-08-14 | fb295fc | removed /login component | Cleaned up unused login component | Cleanup |
| 2025-08-14 | bc05514 | added toast notification and login/signup model | Added react-toastify notifications and login/signup modal | Feature |
| 2025-08-14 | cfeaba0 | updated UI design for shipsy | Refined overall UI for a modern look and feel | UI/UX |
| 2025-08-14 | c8ee37f | added Landing page | Implemented landing page for the application | Feature |
| 2025-08-14 | c62a163 | init tailwindcss | Initialized Tailwind CSS for styling | Setup |
| 2025-08-14 | c972854 | linked new shipment to logged in user | Ensured created shipments are associated with logged-in user | Feature |
| 2025-08-14 | 015610e | fixed auth.js middleware | Corrected authentication middleware logic | Bug Fix |
| 2025-08-14 | 05d77a8 | create models, routes, middleware | Created backend structure including models, routes, and middleware | Setup |
| 2025-08-14 | c7675cd | init monorepo structure | Initialized the project monorepo structure for frontend and backend | Setup |

## Development Statistics by Category

| Category | Count | Percentage |
|----------|-------|------------|
| Backend | 11 | 30.6% |
| Feature | 8 | 22.2% |
| UI/UX | 8 | 22.2% |
| Setup | 3 | 8.3% |
| Bug Fix | 2 | 5.6% |
| Documentation | 2 | 5.6% |
| Cleanup | 2 | 5.6% |
| Authentication | 1 | 2.8% |
| Deployment | 1 | 2.8% |

## Daily Commit Summary

| Date | Commits | Focus Areas |
|------|---------|-------------|
| 2025-08-16 | 10 | UI polish, documentation, deployment fixes |
| 2025-08-15 | 16 | Backend integration, API connections, modals |
| 2025-08-14 | 10 | Initial setup, UI foundation, authentication |

## Key Milestones

| Milestone | Date | Commits | Description |
|-----------|------|---------|-------------|
| Project Initialization | 2025-08-14 | c7675cd | Monorepo structure setup |
| Backend Foundation | 2025-08-14 | 05d77a8 | Models, routes, middleware creation |
| UI Framework Setup | 2025-08-14 | c62a163 | Tailwind CSS initialization |
| Landing Page | 2025-08-14 | c8ee37f | First user-facing page |
| Authentication System | 2025-08-14 | bc05514 | Login/signup implementation |
| Dashboard Creation | 2025-08-14 | 27f93ab | Core dashboard interface |
| Shipment Management | 2025-08-15 | f5b685e | CRUD operations for shipments |
| Backend Integration | 2025-08-15 | d951938 | Full API connectivity |
| Production Deployment | 2025-08-16 | 57e840e | Vercel deployment optimization |
| Final Polish | 2025-08-16 | 0989528 | Performance and UX improvements |

## Technical Stack Overview

| Component | Technology | First Introduced |
|-----------|------------|------------------|
| Frontend Framework | React | 2025-08-14 (c7675cd) |
| Styling | Tailwind CSS | 2025-08-14 (c62a163) |
| Backend | Node.js/Express | 2025-08-14 (05d77a8) |
| Authentication | JWT | 2025-08-14 (015610e) |
| Notifications | React Toastify | 2025-08-14 (bc05514) |
| Deployment | Vercel | 2025-08-16 (57e840e) |
| Project Structure | Monorepo | 2025-08-14 (c7675cd) |

---

## Git Log Data

![gitlog](images/gitlog.png)

---

## Github Commit Map

![commit1](images/commit1.png)
![commit2](images/commit2.png)