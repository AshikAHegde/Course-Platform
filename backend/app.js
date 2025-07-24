const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT ;
const jwb = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./DataBase/db');
const authRoutes = require('./routes/auth');

app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from the frontend URL
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/auth' , authRoutes )

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
