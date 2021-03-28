import sharp from 'sharp';
import asyncHandler from '../middleware/async.js';
import Course from '../models/Course.js';

/**
 * @async
 * @desc get course by ID
 * @route GET /api/courses/:id
 * @access public
 */
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.status(200).send({
    success: true,
    data: course,
  });
});
/**
 * @async
 * @desc get course creators by ID of the course
 * @route GET /api/courses/:id/creators
 * @access public
 */
const getCourseCreators = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('creators');
  res.status(200).send({
    success: true,
    data: course.creators,
  });
});

/**
 * @async
 * @desc Get all courses
 * @route GET /api/courses?select=fields&&location[city,zipcode,street]&&price&&avgRating&&tags
 * @access public
 */
const getCourses = asyncHandler(async (req, res) => {
  res.status(200).send({
    success: true,
    count: res.results.length,
    pagination: res.pagination,
    data: res.results,
  });
});

/**
 * @async
 * @desc create a course
 * @route POST /api/courses/create
 * @access private
 */
const createCourse = asyncHandler(async (req, res) => {
  let { creators } = req.body;
  creators = creators ? [req.user._id, ...creators] : [req.user._id];
  delete req.body.creators;
  const course = await Course.create({
    creators,
    ...req.body,
  });
  res.status(201).send({ success: true, data: course });
});

/**
 * @async
 * @desc update a course
 * @route PATCH /api/courses/update/:id
 * @access private
 */
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    creators: { $all: [req.user._id] },
  });
  await course.updateOne({ ...req.body }, { runValidators: true });
  res.status(200).send({ success: true, data: course });
});

/**
 * @async
 * @desc  get a courses within a radius
 * @route GET /api/courses/radius/:zipcode/:distance
 * @access public
 */
const getCoursesWithinRadius = asyncHandler(async (req, res) => {
  res.status(200).send({
    success: true,
    count: res.results.length,
    pagination: res.pagination,
    data: res.results,
  });
});

/**
 *
 * @async
 * @desc delete course from the db
 * @route DELETE /api/courses/delete/:id
 *
 */
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    creators: { $all: [req.user._id] },
  });
  await course.delete();
  res.status(200).send({ success: true });
});

/**
 * @async
 * @desc upload images
 * @route POST /api/courses/:id/images
 * @access private
 */
const uploadImages = asyncHandler(async (req, res) => {
  const formattedImages = [];
  req.files.forEach((file) => formattedImages.push(file.buffer));
  /* eslint-disable no-return-await */
  formattedImages.map(
    async (image) =>
      await sharp(image).resize({ width: 600, height: 600 }).png().toBuffer()
  );
  const course = await Course.findOne({
    _id: req.params.id,
    creators: { $all: [req.user._id] },
  });
  course.photos = formattedImages;
  await course.save();
  res.status(201).send({ success: true, data: course });
});

/**
 * @async
 * @desc delete images
 * @route DELETE /api/courses/:id/images
 * @access private
 */
const deleteImages = asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    _id: req.params.id,
    creators: { $all: [req.user._id] },
  });
  course.photos = undefined;
  await course.update();
  res.status(200).send({ success: true });
});

export {
  getCourses,
  updateCourse,
  createCourse,
  getCoursesWithinRadius,
  deleteCourse,
  uploadImages,
  deleteImages,
  getCourse,
  getCourseCreators,
};
