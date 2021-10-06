const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
// const { sendEmail } = require('../utils/mailer');

exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation is failed.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const { email, fullname, password } = req.body;
        const hashedPw = await bcrypt.hash(password, 12);
        const userCount = await User.find().countDocuments();
        let user;
        if (userCount !== 0) {
            user = new User({ email, fullname, password: hashedPw });
            await user.save();
        } else {
            user = new User({
                email,
                fullname,
                password: hashedPw,
                isAdmin: true
            });
            await user.save();
        }
        res.status(201).json({ message: "User created." });

        // sendEmail(
        //     user.email,
        //     user.fullname,
        //     'Signup was seccessfull.',
        //     'We glad to have you on board.'
        // )
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Error.");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error(
                "A user with this email could not be found"
            );
            error.statusCode = 401;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            const error = new Error("Wrong password.");
            error.statusCode = 401;
            throw error;
        }

        const token = await jwt.sign(
            {
                user: {
                    userId: user._id.toString(),
                    email: user.email,
                    fullname: user.fullname,
                    isAdmin: user.isAdmin
                }
            },
            "secret",
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({ token, userId: user._id.toString() });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
