import express from 'express';
import {
  createCourse,
  updateCourse,
  getCoursesWithinRadius,
  getCourses,
  deleteCourse,
  uploadImages,
  deleteImages,
  getCourse,
  getCourseCreators,
} from '../controllers/courses.js';
import passport from '../../config/passport-setup.js';
import paginate from '../middleware/paginate.js';
import Course from '../models/Course.js';
import upload from '../middleware/multer.js';

const router = new express.Router();

router.route('/').get(paginate(Course), getCourses);


router.route('/:id/creators').get(getCourseCreators);

router
  .route('/create')
  .post(passport.authenticate('jwt', { session: false }), createCourse);

router
  .route('/:id/images')
  .post(
    passport.authenticate('jwt', { session: false }),
    upload.array('images', 10),
    uploadImages
  );
router
  .route('/:id/images')
  .delete(passport.authenticate('jwt', { session: false }), deleteImages);

router
  .route('/update/:id')
  .patch(passport.authenticate('jwt', { session: false }), updateCourse);

router
  .route('/radius/:zipcode/:distance')
  .get(paginate(Course), getCoursesWithinRadius);

router
  .route('/delete/:id')
  .delete(passport.authenticate('jwt', { session: false }), deleteCourse);

router.route('/:id').get(getCourse);

export default router;
