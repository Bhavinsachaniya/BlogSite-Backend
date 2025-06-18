const express = require("express");
const app = express();
const PORT = 3000;
require('dotenv').config;

const connectDB = require('./config/db');

const Routes = require('./routes/index');

connectDB();

app.use(express.json());

//* Routes
app.use('/api/auth' , Routes.userRoutes); //* User Routes (Signup, login)
app.use('/api/blog', Routes.blogRoutes); //* blog Routes 




app.listen(PORT, () => {
    console.log(`Your Server Running on the port ${PORT}`);
})