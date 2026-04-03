Finance Dashboard Backend
1. Project Overview

This project is a backend system for a Finance Dashboard with Role-Based Access Control (RBAC).
Users can manage financial records, view dashboard summaries, and perform actions based on their roles.

Tech Stack: Node.js, Express.js, PostgreSQL, JWT, bcrypt

2. Features
User & Role Management
1.1 Create, update, and manage users
1.2 Assign roles: Viewer, Analyst, Admin
1.3 Manage user status (active/inactive)
1.4 Role-based permissions enforced
Financial Records Management
2.1 Create, read, update, delete (soft delete) financial records
2.2 Fields: amount, type (income/expense), category, date, notes
2.3 Filter records by type, category, date
2.4 Pagination support
Dashboard Summary APIs
3.1 Total income and expenses
3.2 Net balance
3.3 Category-wise totals
3.4 Recent transactions (last 5)
3.5 Monthly income/expense trends
Access Control Logic
4.1 Viewer: Dashboard only
4.2 Analyst: View records and dashboard, create/update records
4.3 Admin: Full access including user management
Validation & Error Handling
5.1 Input validation using express-validator
5.2 JWT authentication for protected routes
5.3 Role-based authorization (403 for insufficient permissions)
5.4 Proper HTTP status codes: 400, 401, 403, 500
5.5 Soft delete for data safety
3. Setup Instructions
Clone the repository
git clone <repo_url>
cd finance-backend
Install dependencies
npm install
Create .env file:
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/finance_db
JWT_SECRET=your_secret_key
JWT_EXPIRY=1d
Create database tables (see Database Schema)
Start server
npm run dev
Server runs at http://localhost:5000
4. Database Schema

Roles Table

id: SERIAL PRIMARY KEY
name: VARCHAR(20), UNIQUE

Users Table

id: SERIAL PRIMARY KEY
name: VARCHAR(50)
email: VARCHAR(50), UNIQUE
password: VARCHAR(255)
role_id: INT REFERENCES roles(id)
is_active: BOOLEAN DEFAULT TRUE
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

Financial Records Table

id: SERIAL PRIMARY KEY
user_id: INT REFERENCES users(id)
amount: NUMERIC
type: VARCHAR(10)
category: VARCHAR(50)
date: DATE
notes: TEXT
is_deleted: BOOLEAN DEFAULT FALSE
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
5. API Endpoints

Auth

POST /auth/register → Register a new user
POST /auth/login → Login and get JWT

Users

GET /users → Admin only, list all users
PUT /users/:id → Admin only, update user info
DELETE /users/:id → Admin only, delete user
PUT /users/:id/status → Admin only, activate/deactivate user

Financial Records

POST /records → Analyst/Admin, create record
GET /records → Viewer/Analyst/Admin, list records (filterable, paginated)
PUT /records/:id → Analyst/Admin, update record
DELETE /records/:id → Admin, soft delete record

Dashboard

GET /dashboard/summary → Viewer/Analyst/Admin, total income, expenses, net balance
GET /dashboard/category → Viewer/Analyst/Admin, category-wise totals
GET /dashboard/recent → Viewer/Analyst/Admin, last 5 transactions
GET /dashboard/monthly → Viewer/Analyst/Admin, monthly trends
6. Access Control
authMiddleware → Verifies JWT and user status
roleMiddleware → Checks role permissions per route

Roles and Permissions

Viewer → Dashboard only
Analyst → Read/manage records, view dashboard
Admin → Full access (users + records)
7. Validation & Error Handling
Input validation using express-validator
401 → Unauthorized (missing/invalid JWT)
403 → Forbidden (insufficient role)
400 → Bad request (invalid input)
500 → Internal server error (database/server issues)
Soft delete prevents permanent data loss
8. Optional Enhancements
JWT token authentication with expiry
Soft delete for records
Pagination support
Role-based route access control
9. Assumptions & Notes
Email is unique per user
Each record belongs to a single user
Soft delete hides records but keeps them in database
Dashboard summaries are user-specific
