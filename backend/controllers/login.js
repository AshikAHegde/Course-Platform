const { validationResult } = require('express-validator');
const jwb = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        res.status(201).json({ message: 'User logged in successfully', user: { email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

