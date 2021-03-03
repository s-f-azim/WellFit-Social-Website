import asyncHandler from '../middleware/async.js';
import Course from '../models/Course.js';

const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).send({ success: true, data: course });
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  res.status(200).send({ success: true, data: course });
});

export { updateCourse, createCourse };
