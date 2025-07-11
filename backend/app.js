const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

const jwb = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./DataBase/db');
const authRoutes = require('./Routes/auth/signup');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('auth' , authRoutes )

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

