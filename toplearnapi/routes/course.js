const express = require('express');
const { body } = require('express-validator');

const courseController = require('../controllers/course');
const { isAuth } = require('../middlewares/is-auth');
const upload = require('../utils/multer');

const router = express.Router();

//──── GET Http Methods ──────────────────────────────────────────────────────────────────
// GET /api/courses
router.get('/courses', courseController.getCourses);

// GET /api/course/:courseId
router.get('/course/:courseId', courseController.getCourse);
//──── GET Http Methods ──────────────────────────────────────────────────────────────────

//──── POST Http Methods ─────────────────────────────────────────────────────────────────
// POST /api/course
router.post(
    '/course',
    isAuth,
    upload.single('imageUrl'),
    [
        body('title')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('info')
            .trim()
            .not()
            .isEmpty()
    ],
    courseController.createCourse
);
//──── POST Http Methods ─────────────────────────────────────────────────────────────────

//──── PUT Http Methods ──────────────────────────────────────────────────────────────────
// PUT /api/course/:courseId
router.put(
    '/course/:courseId',
    isAuth,
    upload.single('imageUrl'),
    [
        body('title')
            .trim()
            .isLength({ min: 5 })
            .not()
            .isEmpty(),
        body('info')
            .trim()
            .not()
            .isEmpty()
    ],
    courseController.updateCourse
);
//──── PUT Http Methods ──────────────────────────────────────────────────────────────────

//──── DELETE Http Methods ───────────────────────────────────────────────────────────────
// DELETE /api/course/:courseId
router.delete('/course/:courseId', isAuth, courseController.deleteCourse);
//──── DELETE Http Methods ───────────────────────────────────────────────────────────────

module.exports = router;
