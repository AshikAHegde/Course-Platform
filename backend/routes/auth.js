const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const { body } = require('express-validator');

const validateSignup = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

router.post('/signup', validateSignup, signup);

module.exports = router;
