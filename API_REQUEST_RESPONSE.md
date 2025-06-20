## 📨 API Request & Response Samples (URL-Wise)

---

### 📌 `/api/auth/signup`

#### 🟢 Request
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secure123"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "60ed...",
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

---

### 📌 `/api/auth/login`

#### 🟢 Request
```json
{
  "email": "alice@example.com",
  "password": "secure123"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

---

### 📌 `/api/auth/send-otp`

#### 🟢 Request
```json
{
  "email": "alice@example.com"
}
```

#### 🟣 Response
```json
{
  "message": "OTP send to your email"
}
```

---

### 📌 `/api/auth/login/verify`

#### 🟢 Request
```json
{
  "email": "alice@example.com",
  "otp": "123456"
}
```

#### 🟣 Response
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

---

### 📌 `/api/auth/deleteAuthor`

#### 🟢 Request
```json
{
  "author": "alice@example.com"
}
```

#### 🟣 Response
```json
{
  "sucess": true,
  "message": "alice@example.com sucessfully deleted",
  "deletedAllBlog": true
}
```

---

### 📌 `/api/blog/createBlog`

#### 🟢 Request
```json
{
  "title": "My Blog Title",
  "blog": "This is the blog content",
  "author": "Alice"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "blogId",
    "title": "My Blog Title",
    "content": "This is the blog content",
    "author": "authorObjectId"
  }
}
```

---

### 📌 `/api/blog/readAll`

#### 🟣 Response
```json
{
  "success": true,
  "message": "All data successfully fetched",
  "data": [
    {
      "_id": "blogId",
      "title": "Blog 1",
      "content": "Blog content",
      "author": "authorId"
    }
  ]
}
```

---

### 📌 `/api/blog/authorAllblog`

#### 🟢 Request
```json
{
  "author": "authorId"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "message": "All blogs fetched successfully",
  "data": [
    {
      "title": "Blog title",
      "content": "Blog body",
      "author": "authorId"
    }
  ]
}
```

---

### 📌 `/api/blog/deleteBlogPost`

#### 🟢 Request
```json
{
  "author": "authorId",
  "title": "Blog Title"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "message": "Successfully deleted blog posts"
}
```

---

### 📌 `/api/com/addcomment`

#### 🟢 Request
```json
{
  "userId": "userId",
  "blogId": "blogId",
  "content": "Great work!"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "message": "Successfully added comment",
  "comment": {
    "content": "Great work!",
    "blogid": "blogId",
    "userid": "userId"
  }
}
```

---

### 📌 `/api/com/allComments`

#### 🟢 Request
```json
{
  "blogId": "blogId"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "comments": [
    {
      "_id": "commentId",
      "content": "Great job!",
      "user": "userId",
      "blogId": "blogId"
    }
  ]
}
```

---

### 📌 `/api/com/deleteComment`

#### 🟢 Request
```json
{
  "commentId": "commentId"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

---

### 📌 `/api/like/addlike`

#### 🟢 Request
```json
{
  "userId": "userId123",
  "blogId": "blogId456"
}
```

#### 🟣 Response (Like added)
```json
{
  "success": true,
  "message": "successfully added Like",
  "data": {
    "blogid": "blogId456",
    "userid": "userId123"
  }
}
```

#### 🟣 Response (Like removed)
```json
{
  "success": true,
  "message": "like successfully Deleted"
}
```

---

### 📌 `/api/like/getalllike/:blogId`

#### 🟣 Response
```json
{
  "success": true,
  "blogId": "blogId",
  "totalLikes": 3
}
```

---

### 📌 `/api/like/getAllLikeDetails`

#### 🟢 Request
```json
{
  "blogId": "blogId"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "data": [
    {
      "name": "Alice",
      "email": "alice@example.com",
      "_id": "likeId"
    }
  ],
  "message": "all likesDetails"
}
```

---

### 📌 `/api/user/followUser`

#### 🟢 Request
```json
{
  "followerId": "user1Id",
  "authorId": "user2Id"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "data": {
    "follower": "user1Id",
    "author": "user2Id"
  }
}
```

---

### 📌 `/api/user/unfollowUser`

#### 🟢 Request
```json
{
  "followerId": "user1Id",
  "authorId": "user2Id"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "message": "unfollwed successfully"
}
```

---

### 📌 `/api/user/getFollowers`

#### 🟢 Request
```json
{
  "userId": "yourAuthorId"
}
```

#### 🟣 Response
```json
{
  "success": true,
  "followers": [
    {
      "followerId": "followerId",
      "name": "John",
      "email": "john@example.com"
    }
  ]
}
```

---

### 📌 `/api/user/:userId`

#### 🟣 Response
```json
{
  "success": true,
  "following": [
    {
      "authorId": "abc123",
      "name": "Alice",
      "email": "alice@email.com"
    }
  ]
}
```
