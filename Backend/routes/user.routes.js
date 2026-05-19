const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');


router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname').isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('mobile').matches(/^\d{10}$/).withMessage('Please enter a valid 10-digit mobile number')

],
    userController.registerUser
)       







modules.exports = router;
