const express = require('express');
const router = express.Router();
const { getCourses, addCourse, updateCourse, addCourseDate, addStudentToCourse, addNameAndDescriptionToCourse, getStudentsInCourse, addTeacherToCourse } = require('../controllers/courses');

router.get('/courses', getCourses);
router.post('/courses', addCourse);
router.put('/courses/:id', updateCourse);
router.put('/courses/:id/date', addCourseDate);
router.put('/courses/:id/students', addStudentToCourse);
router.put('/courses/:id/name-description', addNameAndDescriptionToCourse);
router.get('/courses/:id/students', getStudentsInCourse);
router.put('/courses/:id/teacher', addTeacherToCourse);

module.exports = router;
