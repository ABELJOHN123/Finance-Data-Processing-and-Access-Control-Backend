
Finance Dashboard Backend

This project implements a backend for a Finance Dashboard system with Role-Based Access Control (RBAC).
Users can manage financial records, view dashboard summaries, and perform actions based on their role.

The backend is built using Node.js, Express.js, and PostgreSQL, and provides REST APIs for frontend integration.

Features
Feature	Description
User & Role Management	Create, update, manage users; assign roles (Viewer, Analyst, Admin); manage user status; enforce RBAC permissions
Financial Records Management	CRUD (soft delete) for financial entries; fields: amount, type, category, date, notes; filtering and pagination support
Dashboard Summary APIs	Total income/expense, net balance, category-wise totals, last 5 transactions, monthly trends
Access Control	RBAC enforced at backend; Viewer: dashboard only, Analyst: manage records & dashboard, Admin: full access
Validation & Error Handling	express-validator input validation, JWT authentication, role-based authorization, proper HTTP status codes, soft delete
Tech Stack
Technology	Purpose
Node.js	Server runtime
Express.js	Backend framework
PostgreSQL	Database
JWT	Authentication
bcrypt	Password hashing
Setup Instructions
Step	Command / Action
Clone repo	git clone <repo_url>
cd finance-backend
Install dependencies	npm install
Setup .env	PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/finance_db
JWT_SECRET=your_secret_key
JWT_EXPIRY=1d
Start server	npm run dev
Server runs at http://localhost:5000
Database Schema
Table	Columns
Roles	id SERIAL PRIMARY KEY, name VARCHAR(20) NOT NULL UNIQUE
Users	id SERIAL PRIMARY KEY, name VARCHAR(50), email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, role_id INT REFERENCES roles(id), is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
Financial Records	id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), amount NUMERIC NOT NULL, type VARCHAR(10), category VARCHAR(50), date DATE, notes TEXT, is_deleted BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
Role	Allowed Actions
Viewer	View dashboard only
Analyst	Read records, create/update records, dashboard access
Admin	Full access (records + users)
Validation & Error Handling
Scenario	Response
Invalid or missing JWT	401 Unauthorized
Insufficient role	403 Forbidden
Invalid input	400 Bad Request
Database / server errors	500 Internal Server Error
Soft delete	Records hidden but retained in DB
Optional Enhancements
Feature	Description
JWT expiry	Tokens have 1-day expiry
Soft delete	Records not permanently deleted
Pagination	For record listing
Role-based middleware	Enforce route-level permissions
Assumptions & Notes
Point	Note
Unique Email	Each user has a unique email
User-specific records	All financial records belong to a single user
Soft delete	Hides records but keeps them in DB
Dashboard summaries	User-specific
