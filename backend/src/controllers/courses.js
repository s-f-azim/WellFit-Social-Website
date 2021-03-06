import geocoder from '../utils/geocoder.js';
import asyncHandler from '../middleware/async.js';
import Course from '../models/Course.js';

/**
 * @async
 * @desc Get all courses
 * @route GET /api/courses?select=fields&&location[city,zipcode,street]&price&avgRating&tags
 * @access public
 */
const getCourses = asyncHandler(async (req, res) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ['select'];
  removeFields.forEach((param) => delete reqQuery[param]);
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lt|in)\b/g,
    (match) => `$${match}`
  );
  query = Course.find(JSON.parse(queryStr));
  // check if select given
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  // check if sort is given
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('createdAt');
  }
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
