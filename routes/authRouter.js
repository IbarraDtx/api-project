const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/register', authMiddleware, roleMiddleware('admin'), authController.registrar);
router.post('/login', authController.login);

module.exports = router;
