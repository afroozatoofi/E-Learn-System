const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');
const userController = require('../controllers/user');

//──── POST Http Methods ─────────────────────────────────────────────────────────────────
//POST /api/register
router.post(
    '/register',
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Email is not valid.')
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(user => {
                    if (user) {
                        return Promise.reject('Email address already exist');
                    }
                });
            }),
        body('fullname')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty()
            .withMessage('fullname is required.'),
        body('password')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty()
            .withMessage('password is required.')
    ],
    userController.registerUser
);

// POST /api/login
router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Email is not valid.')
            .not()
            .isEmpty(),
        body('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Password is required.')
    ],
    userController.loginUser
);
//──── POST Http Methods ─────────────────────────────────────────────────────────────────

module.exports = router;
