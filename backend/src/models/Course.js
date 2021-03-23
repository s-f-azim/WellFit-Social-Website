import mongoose from 'mongoose';
import slugify from 'slugify';
import geocoder from '../utils/geocoder.js';

const CourseSchema = new mongoose.Schema(
  {
    creators: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        required: [true, 'Please enter the authors of the course'],
        ref: 'User',
      },
    ],
    description: {
      type: String,
      required: [true, 'Please enter a description'],
    },

    title: {
      type: String,
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
    },
    isVirtual: Boolean,
    gym: Boolean,
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
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    trainingDuration: {
      type: Number,
      min: 0,
      validate: {
        validator: Number.isInteger,
      },
    },
    trainingEquipment: [
      {
        type: String,
        enum: ['dumbbells', 'barbells', 'resistanceBands', 'treadmill'],
      },
    ],
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must can not be more than 5'],
    },
    photos: {
      type: [Buffer],
    },
  },
  { timestamps: true }
);

// Geocode and create location field
CourseSchema.pre('save', async function (next) {
  if (!this.address) next();
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
