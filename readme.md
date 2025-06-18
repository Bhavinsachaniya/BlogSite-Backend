# 📝 Blog API - Node.js + Express + MongoDB

This is a full-featured REST API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** that powers a blog system with user authentication, blog creation, user following/unfollowing, email-based OTP login, comments, and likes.

---

## 📁 Project Structure

```
├── config/
│   └── db.js
├── controllers/
│   ├── blogGenrate.controller.js
│   ├── follow.Controller.js
│   ├── userController.js
│   ├── index.js
├── models/
│   ├── blogModel.js
│   ├── commentModel.js
│   ├── follower.Model.js
│   ├── likeModel.js
│   ├── tagsModel.js
│   └── userModel.js
├── routes/
│   ├── index.js
│   └── v1/
│       ├── blog.Routes.js
│       └── user.Routes.js
├── Utils/
│   └── mailer.js
├── .env
├── .gitignore
├── app.js
└── README.md
```

---

## ⚙️ Features

- ✅ User signup/login with JWT  
- 📧 Email OTP-based login  
- ➕ Create/read/delete blogs  
- 👥 Follow/unfollow users  
- 🧠 Comments and likes structure (models ready for expansion)  
- 📚 Tags support for blogs  
- 🚀 MongoDB integration using **Mongoose**  
- 🔐 Password hashing + authentication  

---

## 🔧 Technologies

- **Node.js**  
- **Express.js**  
- **MongoDB** & **Mongoose**  
- **JWT**  
- **Bcrypt**  
- **Nodemailer**  
- **dotenv**  

---

## 📦 Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root and add:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your-very-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

---

## ▶️ Run the App

```bash
npm start
```

The server will start on:  
📍 `http://localhost:3000`

---

## 🔌 API Routes

### 🧑 User Auth

| API                        | METHOD | DESCRIPTION                |
|---------------------------|--------|----------------------------|
| `/api/auth/signup`        | POST   | Register new user          |
| `/api/auth/login`         | POST   | Login with email/password  |
| `/api/auth/send-otp`      | POST   | Send OTP for email login   |
| `/api/auth/login/verify`  | POST   | Verify OTP and login       |
| `/api/auth/deleteAuthor`  | POST   | Delete user + all blogs    |

### 📝 Blog Routes

| API                          | METHOD | DESCRIPTION                  |
|-----------------------------|--------|------------------------------|
| `/api/blog/createBlog`      | POST   | Create a blog post           |
| `/api/blog/readAll`         | GET    | Read all blogs               |
| `/api/blog/authorAllblog`   | GET    | Get blogs by author ID       |
| `/api/blog/deleteBlogPost`  | POST   | Delete blog by title/author  |

### 👥 Follow System

| API                        | METHOD | DESCRIPTION                   |
|---------------------------|--------|-------------------------------|
| `/api/auth/followUser`    | POST   | Follow another user           |
| `/api/auth/unfollowUser`  | POST   | Unfollow a user               |
| `/api/auth/:userId`       | GET    | Get users you're following    |
| `/api/auth/getFollowers`  | GET    | Get list of users following you |

---

## 🧪 Sample Request Bodies

### 🔐 User Auth

```json
// /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePass123"
}
```

```json
// /api/auth/login
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

```json
// /api/auth/send-otp
{
  "email": "john@example.com"
}
```

```json
// /api/auth/login/verify
{
  "email": "john@example.com",
  "otp": "123456"
}
```

```json
// /api/auth/deleteAuthor
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

---

### 📝 Blog APIs

```json
// /api/blog/createBlog
{
  "title": "My First Blog",
  "blog": "Some awesome content here...",
  "author": "authorObjectId"
}
```

---

### 👥 Follow/Unfollow APIs

```json
// /api/auth/followUser
{
  "followerId": "user1ObjectId",
  "authorId": "user2ObjectId"
}
```

```json
// /api/auth/unfollowUser
{
  "followerId": "user1ObjectId",
  "authorId": "user2ObjectId"
}
```

---

## 🌐 License

This project is open source and free to use under the [MIT License](LICENSE).

---

## 🚀 One-Step Setup Command

```bash
git clone <your-repo-url> && \
cd <your-repo-name> && \
npm install && \
echo -e "MONGO_URI=your_mongo_uri\nJWT_SECRET=your_jwt_secret\nEMAIL_USER=your_email\nEMAIL_PASS=your_email_password" > .env && \
npm start
```

> 🛠️ Replace:
> - `your-repo-url` with your GitHub repo URL  
> - `your-repo-name` with your project folder name  
> - `.env` values with your real credentials
