const { validationResult } = require('express-validator');

module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        res.status(201).json({ message: 'User registered successfully', user: { username, email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

