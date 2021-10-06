const { validationResult } = require('express-validator');

const Course = require('../models/course');
const { clearImage } = require('../utils/course');

exports.getCourses = async (req, res, next) => {
    // const currentPage = Number.parseInt(req.query.page) || 1;
    // const perPage = Number.parseInt(req.query.perpage) || 4;
    try {
        const totalCourse = await Course.find().countDocuments();
        const courses = await Course.find();
            // .skip((currentPage - 1) * perPage)
            // .limit(perPage);

        res.status(200).json({ courses, totalCourse });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getCourse = async (req, res, next) => {
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            const error = new Error('Could not find course.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ course });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createCourse = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const { title, price, info } = req.body;
        const imageUrl = `images/${req.file.filename}`;

        if (!imageUrl) {
            const error = new Error('Please select an image to upload.');
            error.statusCode = 422;
            throw error;
        }

        const course = new Course({
            title,
            price,
            imageUrl,
            info,
            creator: req.userId
        });
        await course.save();

        res.status(201).json({ message: 'Course created.', course });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateCourse = async (req, res, next) => {
    const courseId = req.params.courseId;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        let { title, price, imageUrl, info } = req.body;
        if (req.file) {
            imageUrl = `images/${req.file.filename}`;
        }
        if (!imageUrl) {
            const error = new Error('No image picked.');
            error.statusCode = 422;
            throw error;
        }

        const course = await Course.findById(courseId);

        if (!course) {
            const error = new Error('Could not find the course.');
            error.statusCode = 404;
            throw error;
        }

        if (imageUrl !== course.imageUrl) {
            console.log(course.imageUrl);
            clearImage(course.imageUrl);
        }

        course.title = title;
        course.price = price;
        course.imageUrl = imageUrl;
        course.info = info;

        await course.save();

        res.status(200).json({ message: 'Course updated.', course });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteCourse = async (req, res, next) => {
    const courseId = req.params.courseId;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            const error = new Error('Could not find the course.');
            error.statusCode = 404;
            throw error;
        }
        clearImage(course.imageUrl);
        await Course.findByIdAndRemove(courseId);

        res.status(200).json({ message: 'Course has been deleted.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
