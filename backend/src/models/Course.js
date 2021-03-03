import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  creators: {
    type: [mongoose.Schema.Types.ObjectId],
    required: [true, 'Please enter the authors of the package'],
    ref: 'User',
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
  },

  title: {
    type: String,
    required: [true, 'Please enter the title of the course '],
  },
  tags: {
    type: [String],
    required: [true, 'Please enter tags for the course'],
    enum: ['weight loss', 'ass', 'yoga', 'meditation'],
  },
  isVirtual: Boolean,
  Gym: Boolean,
  location: {},
  price: {
    type: Number,
    required: [true, 'Please enter a price if it is free leave it as 0'],
  },
});
// create course model
const Course = mongoose.model('Course', CourseSchema);

export default Course;
