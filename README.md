Finance Dashboard Backend
1. Project Overview

This project is a backend system for a Finance Dashboard with Role-Based Access Control (RBAC).
Users can manage financial records, view dashboard summaries, and perform actions based on their role.

The backend is built using Node.js, Express.js, and PostgreSQL, providing REST APIs for frontend integration.

2. Features
User & Role Management
Create, update, and manage users
Assign roles: Viewer, Analyst, Admin
Manage user status (active/inactive)
Role-based permissions enforced on backend
Financial Records Management
Create, read, update, delete (soft delete) financial records
Fields: amount, type (income/expense), category, date, notes
Filter records by type, category, date
Pagination support
Dashboard Summary APIs
Total income and expenses
Net balance calculation
Category-wise totals
Recent transactions (last 5)
Monthly income/expense trends
Access Control Logic
Viewer: Dashboard only
Analyst: View records and dashboard, create/update records
Admin: Full access including user management
Validation & Error Handling
Input validation using express-validator
JWT authentication for all protected routes
Role-based authorization (403 for insufficient permissions)
Proper HTTP status codes: 400, 401, 403, 500
Soft delete prevents permanent data loss
3. Tech Stack
Node.js
Express.js
PostgreSQL
JWT for authentication
bcrypt for password hashing
4. Setup Instructions

Clone the repository

git clone <repo_url>
cd finance-backend

Install dependencies

npm install

Create .env file

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/finance_db
JWT_SECRET=your_secret_key
JWT_EXPIRY=1d
Create database tables (see Database Schema
)

Start the server

npm run dev

The server will run at http://localhost:5000.

5. Database Schema

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
6. API Endpoints
6.1 Auth
Method	Endpoint	Description
POST	/auth/register	Create a new user
POST	/auth/login	Login and get JWT
6.2 Users
Method	Endpoint	Roles Allowed	Description
GET	/users	Admin	Get all users
PUT	/users/:id	Admin	Update user info
DELETE	/users/:id	Admin	Delete user
PUT	/users/:id/status	Admin	Activate/deactivate user
6.3 Financial Records
Method	Endpoint	Roles Allowed	Description
POST	/records	Analyst, Admin	Create a record
GET	/records	Viewer, Analyst, Admin	Get records (filterable, paginated)
PUT	/records/:id	Analyst, Admin	Update record
DELETE	/records/:id	Admin	Soft delete record
6.4 Dashboard
Method	Endpoint	Roles Allowed	Description
GET	/dashboard/summary	Viewer, Analyst, Admin	Total income, expenses, net balance
GET	/dashboard/category	Viewer, Analyst, Admin	Category-wise totals
GET	/dashboard/recent	Viewer, Analyst, Admin	Last 5 transactions
GET	/dashboard/monthly	Viewer, Analyst, Admin	Monthly trends
7. Access Control
authMiddleware: Verifies JWT and user status
roleMiddleware: Checks role permissions per route

Role Mapping:

Role	Allowed Actions
Viewer	Dashboard only
Analyst	Read & manage records, dashboard access
Admin	Full access (records + users)
8. Validation & Error Handling
Input validation using express-validator
Missing/invalid JWT → 401 Unauthorized
Insufficient role → 403 Forbidden
Invalid input → 400 Bad Request
Database or server errors → 500 Internal Server Error
Soft delete prevents permanent record loss
9. Optional Enhancements
JWT token authentication with expiry
Soft delete for records
Pagination for record listing
Role-based route access control
10. Assumptions & Notes
Email is unique per user
Each record belongs to a single user
Soft delete hides records but keeps them in database
Dashboard summaries are user-specific

This version is numbered 1-10, with proper spacing, Markdown tables for endpoints and roles, subpoints aligned, and ready for GitHub.

If you want, I can also make a Postman Collection JSON for this backend so you can import and test all APIs directly, which will make your submission complete.

Do you want me to do that next?

 You're using a less powerful model until your limit resets tomorrow after 3:05 PM. Upgrade to get more access.
Claim free offer
