const express = require("express");
const app = express();
const PORT = 3000;
require('dotenv').config;

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');

connectDB();

app.use(express.json());

//* Routes
app.use('/api/auth' , userRoutes); //* User Routes (Signup, login)




app.listen(PORT, () => {
    console.log(`Your Server Running on the port ${PORT}`);
})