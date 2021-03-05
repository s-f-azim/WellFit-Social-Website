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
    unique: true,
    trim: true,
    required: [true, 'Please enter the title of the course '],
  },
  tags: {
    type: [String],
    required: [true, 'Please enter tags for the course'],
    enum: [
      '#GetFit',
      '#Cardio',
      '#Cycling',
      '#FitFam',
      '#FitLife',
      '#Fitness',
      '#FitnessMotivation',
      '#FitnessAddict',
      '#GetStrong',
      '#LiftHeavy',
      '#GirlsWhoLift',
      '#GymLife',
      '#GymTime',
      '#NoPainNoGain',
      '#PersonalTrainer',
      '#Sweat',
      '#Weights',
      '#WeightLifting',
      '#Workout',
    ],
  },
  isVirtual: Boolean,
  Gym: Boolean,
  slug: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    zipcode: String,
    country: String,
  },
  price: {
    type: Number,
    required: [true, 'Please enter a price if it is free leave it as 0'],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5'],
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
});
// create course model
const Course = mongoose.model('Course', CourseSchema);

export default Course;
