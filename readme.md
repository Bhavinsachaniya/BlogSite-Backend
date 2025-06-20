# 📝 Blog API – Full-Stack Backend (NodeJS + Express + MongoDB)

> A secure and modular REST API backend for a **Blogging Platform** enabling user authentication (JWT & OTP), blog publishing, commenting, liking, and follow system between users.

---

## 📖 Table of Contents

* [🧠 About](#-about)
* [✨ Features](#-features)
* [📦 Folder Structure](#-folder-structure)

  * [📁 Code Tree](#code-structure)
  * [🔍 Folder Breakdown](#-folder-breakdown--details)
* [⚙️ Tech Stack](#-tech-stack)
* [🚀 Setup & Installation](#-setup--installation)
* [🔑 Environment Variables](#-environment-variables)
* [📡 API Endpoints](#-api-endpoints)
* [📨 API Request / Response Samples (All)](#-api-request--response-samples-all)
* [🗂️ Database Schema](#-database-schema)
* [🧪 Testing](#-testing)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)

---

## 🧠 About

This project is a **modular backend service** for a real-world blogging platform:

* Allows secure email/password and OTP-based user login.
* Authenticated users can create, delete & view blogs.
* Users can follow/unfollow each other, comment & like posts.

---

## ✨ Features

* 🔒 OTP & Password-Based Login (JWT-secured)
* ✍️ Blogging System (Create, Read, Delete)
* 📌 Tags-ready blog structure (Schema in place)
* 💬 Commenting System (Add, Get, Delete)
* 👍 Like System (Toggle and Count)
* 👥 Follow System (Followers & Followed)

---

## 📦 Folder Structure

### 📁 Code Structure

```bash
blog-api/
|
├── config/
│   └── db.js
│
├── controllers/
│   ├── blogGenrate.controller.js
│   ├── comments.controller.js
│   ├── follower.Controller.js
│   ├── like.Controller.js
│   ├── user.Controller.js
│   └── index.js
│
├── models/
│   ├── blogModel.js
│   ├── commentModel.js
│   ├── follower.Model.js
│   ├── likeModel.js
│   ├── tagsModel.js
│   └── userModel.js
│
├── routes/
│   ├── v1/
│   │   ├── auth.Routes.js
│   │   ├── blog.Routes.js
│   │   ├── comment.Routes.js
│   │   ├── like.Routes.js
│   │   └── user.Routes.js
│   └── index.js
│
├── Utils/
│   └── mailer.js
│
├── .env
├── .gitignore
├── app.js
└── README.md
```

---

### 🔍 Folder Breakdown + Details

* `/config/db.js`: MongoDB connection logic.
* `/controllers/`: Handles all business logic.
* `/models/`: Mongoose schemas for database collections.
* `/routes/`: API endpoint definitions.
* `/Utils/`: Mailer utility for OTP.
* `app.js`: Main entry point.

---

## ⚙️ Tech Stack

| Technology | Role                |
| ---------- | ------------------- |
| Node.js    | Runtime environment |
| Express.js | HTTP server         |
| MongoDB    | Document DB         |
| Mongoose   | ODM for MongoDB     |
| JWT        | Auth token issuing  |
| Bcrypt     | Password hashing    |
| Nodemailer | Send OTP emails     |
| dotenv     | Environment config  |

---

## 🚀 Setup & Installation

```bash
git clone https://github.com/bhavinsachaniya/BlogSite-Backend.git
cd BlogSite-Backend
npm install
touch .env
npm start
```

---

## 🔑 Environment Variables

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## 📡 API Endpoints

| CATEGORY  | METHOD | ENDPOINT                       | DESCRIPTION               |
| --------- | ------ | ------------------------------ | ------------------------- |
| Auth      | POST   | `/api/auth/signup`             | Register user             |
|           | POST   | `/api/auth/login`              | Login with password       |
|           | POST   | `/api/auth/send-otp`           | Send OTP                  |
|           | POST   | `/api/auth/login/verify`       | Verify OTP                |
|           | POST   | `/api/auth/deleteAuthor`       | Delete user + all blogs   |
| Blog      | POST   | `/api/blog/createBlog`         | Create blog post          |
|           | GET    | `/api/blog/readAll`            | Get all blogs             |
|           | GET    | `/api/blog/authorAllblog`      | Get blogs by author       |
|           | POST   | `/api/blog/deleteBlogPost`     | Delete blog by title      |
| Comments  | POST   | `/api/com/addcomment`          | Add comment               |
|           | POST   | `/api/com/allComments`         | Get comments by blog      |
|           | POST   | `/api/com/deleteComment`       | Delete comment            |
| Likes     | POST   | `/api/like/addlike`            | Toggle like               |
|           | GET    | `/api/like/getalllike/:blogId` | Get like count            |
|           | POST   | `/api/like/getAllLikeDetails`  | Get list of likes (users) |
| Followers | POST   | `/api/user/followUser`         | Follow user               |
|           | POST   | `/api/user/unfollowUser`       | Unfollow user             |
|           | POST   | `/api/user/getFollowers`       | Get followers             |
|           | GET    | `/api/user/:userId`            | Get following             |

---

## 📨 API Request / Response Samples (All)

Please refer to the dedicated [API\_REQUEST\_RESPONSE.md](apiReqRes.md) file for detailed:

* 📬 Sample JSON requests
* 💌 JSON responses
* 🧪 Alternate/Edge case responses
* 📂 Grouped by module (Auth, Blog, Like, etc.)

---

## 🗂️ Database Schema

```ts
User {
  name: String,
  email: String,
  password: String,
  otp: String,
  otpExpiry: Date
}

Post {
  title: String,
  content: String,
  author: ObjectId(User),
  tagid: ObjectId(Tag),
  createdAt,
  updatedAt
}

Comment {
  content: String,
  blogid: ObjectId(Post),
  userid: ObjectId(User)
}

Like {
  blogid: ObjectId(Post),
  userid: ObjectId(User)
}

Follower {
  follower: ObjectId(User),
  author: ObjectId(User)
}
```

---
## 📢 Contact

| Platform | Link                                                     |
| -------- | -------------------------------------------------------- |
| Email    | [bhvain.sachaniya.200@gmail.com](bhavin.sachaniya.2oo@gmail.com) |
| GitHub   | [@bhavinsachaniya](https://github.com/bhavinsachaniya)       |

> ✨ Plug this backend into React, Vue, Next.js or even Flutter frontend to build your full-stack blog app.
