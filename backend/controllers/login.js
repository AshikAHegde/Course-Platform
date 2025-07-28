const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const secretKey = process.env.JWT_SECRET
const userModel = require('../models/user');

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email ' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
        res.cookie("token", token 
            , {
            secure: process.env.COOKIE_SECURE ,
            sameSite: "Lax",         // or "None" if cross-site (set "None" + secure in production)
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        
        res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

