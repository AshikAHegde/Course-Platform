const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const { validateSignup , validateLogin } = require('../middleware/validateSignup');


router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;
