const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const { validateSignup , validateLogin } = require('../middleware/validateSignup');
const emailsend = require('../middleware/sendmail');
const emailVerifyController = require('../controllers/emailverify');
const logout = require('../controllers/logout');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login); 
router.post('/emailsend', emailsend);  //having query parameter token
router.post('/emailverify', emailVerifyController);  

module.exports = router;
