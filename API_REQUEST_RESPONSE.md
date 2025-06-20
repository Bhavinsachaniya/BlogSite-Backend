README.md: |
  # 📝 BLOG API - Node.js + Express + MongoDB

  A powerful and production-grade Blog API built using Node.js, Express, and MongoDB — featuring:

  ✅ JWT Authentication  
  ✅ Email-based OTP Login  
  ✅ Full Blog CRUD  
  ✅ Like / Comment system  
  ✅ Follow / Unfollow users  
  ✅ MongoDB Aggregations

  ---

  ## 🚦 FEATURES

  - ✅ User Authentication (JWT & Email OTP)
  - ✒️ Blog Creation & Management
  - 🔥 Like / Unlike Blog Feature
  - 💬 Commenting System
  - 👥 Follow / Unfollow Authors
  - 🛠 Powerful Mongoose Schema Setup

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

  ## 🚀 TECHNOLOGIES USED

  - Node.js
  - Express.js
  - MongoDB + Mongoose
  - JWT / Bcrypt
  - Nodemailer
  - dotenv

  ---

  ## ⚙️ .env SAMPLE

      MONGO_URI=mongodb://localhost:27017/blogDB
      JWT_SECRET=supersecretkey
      EMAIL_USER=youremail@gmail.com
      EMAIL_PASS=yourpassword

  ---

  ## 📦 INSTALLATION

      git clone <your-repo-url>
      cd <your-project>
      npm install
      npm start

  🔗 Server: http://localhost:3000

  ---

  # 📡 API ENDPOINT LIST

  ## 🔐 AUTH & USER

  | METHOD | ENDPOINT                    | ACTION                         |
  |--------|-----------------------------|--------------------------------|
  | POST   | /api/auth/signup            | Register user                  |
  | POST   | /api/auth/login             | Login (email/password)         |
  | POST   | /api/auth/send-otp          | Send OTP via email             |
  | POST   | /api/auth/login/verify      | Login via OTP                  |
  | POST   | /api/auth/deleteAuthor      | Delete author + their blogs    |

  ## ✍️ BLOGS

  | METHOD | ENDPOINT                    | ACTION                         |
  |--------|-----------------------------|--------------------------------|
  | POST   | /api/blog/createBlog        | Create a blog post             |
  | GET    | /api/blog/readAll           | Get all blogs                  |
  | GET    | /api/blog/authorAllblog     | Get all blogs by author        |
  | POST   | /api/blog/deleteBlogPost    | Delete blog by title/author    |

  ## 💬 COMMENTS

  | METHOD | ENDPOINT                    | ACTION                         |
  |--------|-----------------------------|--------------------------------|
  | POST   | /api/com/addcomment         | Add comment to blog            |
  | POST   | /api/com/allComments        | List comments by blogId        |
  | POST   | /api/com/deleteComment      | Delete a comment               |

  ## 👍 LIKES

  | METHOD | ENDPOINT                    | ACTION                         |
  |--------|-----------------------------|--------------------------------|
  | POST   | /api/like/addlike           | Toggle Like/Unlike             |
  | GET    | /api/like/getalllike/:id    | Total likes for a blog         |
  | POST   | /api/like/getAllLikeDetails | List users who liked blog      |

  ## 👥 FOLLOW SYSTEM

  | METHOD | ENDPOINT                    | ACTION                         |
  |--------|-----------------------------|--------------------------------|
  | POST   | /api/auth/followUser        | Follow user                    |
  | POST   | /api/auth/unfollowUser      | Unfollow user                  |
  | POST   | /api/auth/getFollowers      | Get followers of a user        |
  | GET    | /api/auth/:userId           | Get following list             |

  ---

  # 🧪 DETAILED API REQUEST/RESPONSE EXAMPLES

  ## ✅ POST /api/auth/signup

      REQUEST:
      {
        "name": "Alice",
        "email": "alice@example.com",
        "password": "al123456"
      }

      RESPONSE:
      {
        "success": true,
        "message": "User registered successfully",
        "token": "jwt_token_string",
        "user": {
          "id": "user_id",
          "name": "Alice",
          "email": "alice@example.com"
        }
      }

  ## 🔐 POST /api/auth/login

      REQUEST:
      {
        "email": "alice@example.com",
        "password": "al123456"
      }

      RESPONSE:
      {
        "success": true,
        "message": "Login successful",
        "token": "jwt_token_string",
        "user": {
          "id": "user_id",
          "name": "Alice",
          "email": "alice@example.com"
        }
      }

  ## ✉️ POST /api/auth/send-otp

      REQUEST:
      {
        "email": "alice@example.com"
      }

      RESPONSE:
      {
        "message": "OTP send to your email"
      }

  ## ✅ POST /api/auth/login/verify

      REQUEST:
      {
        "email": "alice@example.com",
        "otp": "123456"
      }

      RESPONSE:
      {
        "token": "jwt_token_here",
        "user": {
          "id": "user_id",
          "name": "Alice",
          "email": "alice@example.com"
        }
      }

  ## 🚮 POST /api/auth/deleteAuthor

      REQUEST:
      {
        "author": "Alice"
      }

      RESPONSE:
      {
        "success": true,
        "message": "Alice successfully deleted",
        "deletedAllBlog": true
      }

  ## ✍️ POST /api/blog/createBlog

      REQUEST:
      {
        "title": "Life in Bali",
        "blog": "Wonderful place to explore!",
        "author": "Alice"
      }

      RESPONSE:
      {
        "success": true,
        "message": "Post created successfully",
        "data": {
          "_id": "blog_id",
          "title": "Life in Bali",
          "content": "Wonderful place to explore!",
          "author": "user_id"
        }
      }

  ## 💬 POST /api/com/addcomment

      REQUEST:
      {
        "userId": "user_id",
        "blogId": "blog_id",
        "content": "Great blog post!"
      }

      RESPONSE:
      {
        "success": true,
        "message": "Successfully added comment",
        "comment": {
          "_id": "comment_id",
          "content": "Great blog post!"
        }
      }

  ## 👍 POST /api/like/addlike

      REQUEST:
      {
        "userId": "user_id",
        "blogId": "blog_id"
      }

      RESPONSE:
      {
        "success": true,
        "message": "successfully added Like",
        "data": {
          "_id": "like_id"
        }
      }

  ## 👥 POST /api/auth/followUser

      REQUEST:
      {
        "followerId": "user_id_1",
        "authorId": "user_id_2"
      }

      RESPONSE:
      {
        "success": true,
        "data": {
          "_id": "follow_id"
        }
      }

  ---

  ## ⚠️ AUTHORIZATION HEADERS

  For all protected routes, send:

      Authorization: Bearer <your-jwt-token>

  ---
