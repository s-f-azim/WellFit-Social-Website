import mongoose from 'mongoose';
import slugify from 'slugify';
import geocoder from '../utils/geocoder.js';

const CourseSchema = new mongoose.Schema(
  {
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
      index: true,
      required: [true, 'Please enter the title of the course '],
    },
    tags: {
      type: [String],
      required: [true, 'Please enter tags for the course'],
      enum: [
        'GetFit',
        'Cardio',
        'Cycling',
        'FitFam',
        'FitLife',
        'Fitness',
        'FitnessMotivation',
        'FitnessAddict',
        'GetStrong',
        'LiftHeavy',
        'GirlsWhoLift',
        'GymLife',
        'GymTime',
        'NoPainNoGain',
        'PersonalTrainer',
        'Sweat',
        'Weights',
        'WeightLifting',
        'Workout',
      ],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    isVirtual: Boolean,
    Gym: Boolean,
    slug: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
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
  },
  { timestamps: true }
);
// Geocode and create location field
CourseSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  const {
    longitude,
    latitude,
    formattedAddress,
    streetName,
    city,
    zipcode,
    countryCode,
  } = loc[0];
  this.location = {
    type: 'Point',
    coordinates: [longitude, latitude],
    formattedAddress,
    street: streetName,
    city,
    zipcode,
    country: countryCode,
  };
  this.address = undefined;
  next();
});
// Create course slug from the name
CourseSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// create course model
const Course = mongoose.model('Course', CourseSchema);

export default Course;
