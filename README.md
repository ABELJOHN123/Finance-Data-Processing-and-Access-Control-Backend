Finance Dashboard Backend
Table of Contents
Project Overview
Features
Tech Stack
Setup Instructions
Database Schema
API Endpoints
Access Control
Validation & Error Handling
Optional Enhancements
Assumptions & Notes
Project Overview

This project implements a backend for a Finance Dashboard system with Role-Based Access Control (RBAC).
Users can manage financial records, view dashboard summaries, and perform actions based on their role.

The backend is built using Node.js, Express.js, and PostgreSQL, and provides REST APIs for frontend integration.

Features
1. User & Role Management
Create, update, and manage users
Assign roles: Viewer, Analyst, Admin
Manage user status (active/inactive)
Enforce role-based permissions on backend
2. Financial Records Management
Create, read, update, delete (soft delete) financial entries
Fields: amount, type (income/expense), category, date, notes
Filter records by type, category, and date
Pagination support
3. Dashboard Summary APIs
Total income and expenses
Net balance calculation
Category-wise totals
Recent transactions (last 5)
Monthly income/expense trends
4. Access Control Logic
RBAC enforced at backend using middleware
Viewer: Dashboard only
Analyst: View records and dashboard, manage records
Admin: Full access including user management
5. Validation & Error Handling
Input validation using express-validator
JWT authentication for all protected routes
Role-based authorization (403 for insufficient permissions)
Proper HTTP status codes (400, 401, 403, 500)
Soft delete prevents permanent data loss
Tech Stack
Node.js
Express.js
PostgreSQL
JWT for authentication
bcrypt for password hashing
Setup Instructions
Clone the repository:
git clone <repo_url>
cd finance-backend
Install dependencies:
npm install
Setup .env file:
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/finance_db
JWT_SECRET=your_secret_key
JWT_EXPIRY=1d
Run database migrations or create tables manually (see Database Schema
)
Start the server:
npm run dev

Server will run at http://localhost:5000.

Database Schema
Roles Table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE
);
Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT REFERENCES roles(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Financial Records Table
CREATE TABLE financial_records (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount NUMERIC NOT NULL,
  type VARCHAR(10),
  category VARCHAR(50),
  date DATE,
  notes TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
API Endpoints
Auth
Method	Endpoint	Description
POST	/auth/register	Create a new user
POST	/auth/login	Login and get JWT
Users
Method	Endpoint	Roles Allowed	Description
GET	/users	Admin	Get all users
PUT	/users/:id	Admin	Update user info
DELETE	/users/:id	Admin	Delete user
PUT	/users/:id/status	Admin	Activate/deactivate user
Financial Records
Method	Endpoint	Roles Allowed	Description
POST	/records	Analyst, Admin	Create record
GET	/records	Viewer, Analyst, Admin	Get records (filterable, paginated)
PUT	/records/:id	Analyst, Admin	Update record
DELETE	/records/:id	Admin	Soft delete record
Dashboard
Method	Endpoint	Roles Allowed	Description
GET	/dashboard/summary	Viewer, Analyst, Admin	Total income, expense, net balance
GET	/dashboard/category	Viewer, Analyst, Admin	Category-wise totals
GET	/dashboard/recent	Viewer, Analyst, Admin	Last 5 transactions
GET	/dashboard/monthly	Viewer, Analyst, Admin	Monthly trends
Access Control

Access is enforced using middleware:

authMiddleware → verifies JWT and user status
roleMiddleware → checks role permissions per route

Role Mapping:

Role	Allowed Actions
Viewer	View dashboard only
Analyst	Read records, create/update records, dashboard access
Admin	Full access (records + users)
Validation & Error Handling
Request body validation using express-validator
Invalid or missing JWT → 401 Unauthorized
Insufficient role → 403 Forbidden
Invalid input → 400 Bad Request
Database or server errors → 500 Internal Server Error
Soft delete for financial records prevents permanent loss
Optional Enhancements Implemented
JWT token authentication with expiry
Soft delete for records
Pagination for record listing
Role-based middleware for route access control
Assumptions & Notes
Email is unique for each user
All financial records belong to a single user
Soft delete hides records but keeps them in database
Dashboard summaries are user-specific
