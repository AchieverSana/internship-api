const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);   // Public
router.post('/login', login);          // Public
router.get('/me', protect, getMe);     // Private

module.exports = router;
