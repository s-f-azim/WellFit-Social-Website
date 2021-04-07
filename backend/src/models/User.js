import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse.js';
import geocoder from '../utils/geocoder.js';

// create user schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      required: [true, 'Please add an email address'],
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('Email is Invalid');
      },
    },

    password: {
      type: String,
      required: [
        function () {
          return (
            this.googleId === undefined &&
            this.instaId === undefined &&
            this.facebookId === undefined
          );
        },
        'Please add a password',
      ],
      minlength: 8,
    },
    fName: {
      type: String,
      required: [true, 'please enter your first name'],
      minlength: 2,
    },
    lName: {
      type: String,
      required: [true, 'please enter your last name'],
      minlength: 2,
    },
    screenname: {
      type: String,
      required: false,
      // fix for missing usernames causing validation fail
    },
    gender: {
      type: String,
      trim: true,
      enum: [
        'Male',
        'Female',
        'Non-Binary',
        'Prefer not to say',
        'Not specified',
      ],
      default: 'Not specified',
    },

    address: {
      type: String,
    },
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
    age: {
      type: Number,
    },

    birthday: {
      type: Date,
    },

    nickname: {
      type: String,
    },

    bio: {
      type: String,
    },

    weight: {
      type: Number,
      min: 0,
    },

    height: {
      type: Number,
      min: 0,
    },

    preferredGender: {
      type: String,
      enum: ['male', 'female', 'any'],
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
        enum: [
          'dumbbells',
          'barbells',
          'resistanceBands',
          'treadmill',
          'cardioMachines',
          'kettlebells',
          'freeWeights',
          'battleRopes',
          'jumpRope',
          'mats',
          'abWheel',
        ],
      },
    ],

    tags: {
      type: [String],
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
        'Yoga',
        'Meditation',
        'Nutrition',
        'Weightloss',
        'Bodybuilding',
      ],
    },
    trainerType: {
      type: String,
      enum: [
        'Physique trainer',
        'Performance trainer',
        'Lifestyle trainer',
        'Other',
      ],
    },
    qualifications: {
      type: [String],
    },
    yearsExperience: {
      type: Number,
    },
    speciality: {
      type: String,
    },
    customerStories: {
      type: [String],
    },
    communicationModes: {
      type: [String],
      enum: [
        'Email',
        'Phone calls',
        'Text messages',
        'Whatsapp',
        'Social Media',
        'In person preferred',
        'Messaging app',
        'Other',
      ],
    },
    communicationFrequency: {
      type: String,
      enum: [
        'Daily',
        'Three-Four times a week',
        'Twice a week',
        'Weekly',
        'Twice a month',
        'Monthly',
        'Other',
      ],
    },
    priceRange: {
      type: Number,
    },
    paymentFrequency: {
      type: String,
      enum: [
        'One time',
        'Twice a week',
        'Weekly',
        'Twice a month',
        'Monthly',
        'Other',
      ],
    },
    paymentOptions: {
      type: [String],
      enum: [
        'Paypal',
        'Wired (bank) transfer',
        'Cash',
        'Other banking app',
        'Check',
        'Other',
      ],
    },
    serviceFormat: {
      type: [String],
      enum: [
        'Non-client-specific videos',
        'In person sessions',
        'PDFs, Excel sheets or others',
        'Physical product',
        'Audio content',
        'Text based content',
        'Other',
      ],
    },
    clientGenderPreference: {
      type: String,
      enum: ['Male', 'Female', 'Non-Binary', 'Any'],
    },
    clientFitness: {
      type: [Number],
    },
    clientHypertrophy: {
      type: [Number],
    },
    clientStrength: {
      type: [Number],
    },

    googleId: {
      type: String,
    },
    googleAccessToken: {
      type: String,
    },
    googleRefreshToken: {
      type: String,
    },
    instaId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    twitterId: {
      type: String,
    },
    twitterAccessToken: {
      type: String,
    },
    twitterRefreshToken: {
      type: String,
    },
    twitterScreenName: {
      type: String,
    },
    wishlist: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course',
        default: [],
      },
    ],
    photos: {
      type: [Buffer],
      default: [],
    },

    role: {
      type: String,
      enum: ['admin', 'instructor', 'client'],
    },

    verified: {
      type: Boolean,
      default: false,
    },

    following: [{ type: mongoose.Schema.ObjectId, ref: 'User', default: [] }],
    follower: [{ type: mongoose.Schema.ObjectId, ref: 'User', default: [] }],
    isBanned: {
      type: Boolean,
      default: false,
    },

    favourites: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

// connect the creator of courses to the user (ex user.courses)
UserSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'creators',
});

UserSchema.virtual('reviews', {
  ref: 'UserReview',
  localField: '_id',
  foreignField: 'user',
});

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

// connect the creator of requests to the user
UserSchema.virtual('requests', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'author',
});

// change the json to not send specified fields
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password; // remove the password
  return userObject;
};

// hash the password piror to save
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
// Geocode and create location field
UserSchema.pre('save', async function (next) {
  if (!this.address) next();
  if (this.isModified('address')) {
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
  }
  this.screenname = `${this.fName} ${this.lName}`;
  next();
});

// check that given email and password exists
UserSchema.statics.checkCredentials = async ({ email, password }) => {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email }).select('+password -photos');
  if (!user) {
    throw new ErrorResponse('Unable to login', 404);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorResponse('Unable to login', 404);
  }
  return user;
};

// Sign JWT and return the token
UserSchema.methods.getSignedJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET);
};

UserSchema.post('remove', async function (user)  { 
  await this.model('Review').remove( //delete reviews made by user when user deleted
    {author: { $eq: user._id }},
  ).exec();
}); 

// create user model
const User = mongoose.model('User', UserSchema);

export default User;
