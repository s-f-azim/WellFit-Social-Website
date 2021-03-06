import geocoder from '../utils/geocoder.js';
import asyncHandler from '../middleware/async.js';
import Course from '../models/Course.js';

/**
 * @async
 * @desc Get all courses
 * @route GET /api/courses?location[city,zipcode,street]&price&avgRating&tags
 * @access public
 */
const getCourses = asyncHandler(async (req, res) => {
  let query;
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lt|in)\b/g,
    (match) => `$${match}`
  );
  console.log(queryStr);
  query = Course.find(JSON.parse(queryStr));
  const courses = await query;
  res.status(200).send({ success: true, count: courses.length, data: courses });
});

/**
 * @async
 * @desc create a course
 * @route POST /api/courses/create
 * @access private
 */
const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
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
  const { zipcode, distance } = req.params;
  // get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const { latitude, longitude } = loc[0];
  // Calc radius using radians
  const radius = distance / 6378;
  const courses = await Course.find({
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
    },
  });
  res.status(200).send({ success: true, count: courses.length, data: courses });
});

export { getCourses, updateCourse, createCourse, getCoursesWithinRadius };
