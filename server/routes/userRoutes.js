const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Ensure both register and login are passed here as functions
router.post('/register', register);
router.post('/login', login);

module.exports = router;