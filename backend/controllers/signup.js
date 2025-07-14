const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user: { username, email } });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

