# Copilot Instructions for Blogsite Backend

## Project Overview
- **Node.js + Express + MongoDB** REST API for a blogging platform.
- Modular structure: controllers, models, routes, and utilities.
- Features: JWT & OTP authentication, blog CRUD, comments, likes, followers.

## Architecture & Data Flow
- **Entry Point:** `app.js` initializes Express, loads routes, connects to MongoDB via `config/db.js`.
- **Routes:** Defined in `routes/v1/` and aggregated in `routes/index.js`. Each route maps to a controller.
- **Controllers:** Business logic for each module (user, blog, comment, like, follower). Example: `controllers/user.Controller.js` handles signup, login, OTP, follow/unfollow.
- **Models:** Mongoose schemas in `models/` (e.g., `userModel.js`, `blogModel.js`).
- **Utils:** `Utils/mailer.js` for sending OTP emails.

## Developer Workflows
- **Start Server:**
  ```powershell
  npm install
  npm start
  ```
- **Environment:** Requires `.env` with `PORT`, `MONGO_URI`, `EMAIL_USER`, `EMAIL_PASS`, `JWT_SECRET`.
- **API Testing:** Use endpoints from `README.md` and sample requests/responses in `API_REQUEST_RESPONSE.md`.
- **Debugging:** Console logs for DB connection in `config/db.js`. Errors returned as JSON from controllers.

## Conventions & Patterns
- **Controllers:** All business logic, error handling via JSON responses. Use helper functions for repeated logic (e.g., password hashing, JWT generation).
- **Routes:** Grouped by module under `/api/{module}`. Example: `/api/auth/signup`, `/api/blog/createBlog`.
- **Models:** Consistent use of Mongoose schemas. Relationships via ObjectId references.
- **OTP:** Sent via email using `Utils/mailer.js`.
- **Likes/Followers:** Toggle and count logic in respective controllers/models.

## Integration Points
- **External:** MongoDB (via Mongoose), Nodemailer (for OTP), JWT, Bcrypt.
- **Frontend:** Designed to be consumed by any frontend (React, Vue, etc.).

## Key Files & Directories
- `app.js`: Main server setup
- `config/db.js`: MongoDB connection
- `controllers/`: Business logic
- `models/`: Data schemas
- `routes/v1/`: API endpoints
- `Utils/mailer.js`: Email utility
- `API_REQUEST_RESPONSE.md`: Example requests/responses
- `README.md`: Architecture, setup, endpoints

## Example Patterns
- **Signup Flow:**
  - Route: `/api/auth/signup` → Controller: `signUp` in `user.Controller.js`
  - Hash password, create user, return JWT
- **Blog CRUD:**
  - Route: `/api/blog/createBlog` → Controller: `createBlog` in `blogGenrate.controller.js`
- **Follow System:**
  - Route: `/api/user/followUser` → Controller: `followUser` in `user.Controller.js`

---
For API details, see `API_REQUEST_RESPONSE.md`. For architecture, see `README.md`. For DB schema, see models and schema summary in `README.md`.

> If any conventions or flows are unclear, please ask for clarification or examples from the codebase.
