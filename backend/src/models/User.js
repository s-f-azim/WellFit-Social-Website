import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";

//create user schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Please add an email address"],
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is Invalid");
      },
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 8,
    },
    name: {
      type: String,
      required: [true, "please enter your name"],
      minlength: 3,
    },
    gender: {
      type: String,
      trim: true,
      enum: ["Male", "Female", "Non-Binary", "Prefer not to say"],
    },
    location: {
      type: String,
      trim: true,
      enum: [
        "Europe",
        "Asia",
        "North America",
        "South America",
        "Australia",
        "Africa",
        "Prefer not to say",
      ],
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
    trainerType: {
      type: String,
      enum: [
        "Physique trainer",
        "Performance trainer",
        "Lifestyle trainer",
        "Other",
      ],
    },
    qualifications: {
      type: [String],
    },
    speciality: {
      type: [String],
    },
    customerStories: {
      type: [String],
    },
    communicationModes: {
      type: [String],
      enum: [
        "Email",
        "Phone calls",
        "Text messages",
        "Whatsapp",
        "Social Media",
        "In person preferred",
        "Messaging app",
        "Other",
      ],
    },
    communicationFrequency: {
      type: String,
      enum: [
        "Daily",
        "Three-Four times a week",
        "Twice a week",
        "Weekly",
        "Twice a month",
        "Monthly",
        "Other",
      ],
    },
    priceRange: {
      type: Number,
    },
    paymentFrequency: {
      type: String,
      enum: [
        "One time",
        "Twice a week",
        "Weekly",
        "Twice a month",
        "Monthly",
        "Other",
      ],
    },
    paymentOptions: {
      type: [String],
      enum: [
        "Paypal",
        "Wired (bank) transfer",
        "Cash",
        "Other banking app",
        "Check",
        "Other",
      ],
    },
    serviceFormat: {
      type: [String],
      enum: [
        "Non-client-specific videos",
        "In person sessions",
        "PDFs, Excel sheets or others",
        "Physical product",
        "Audio content",
        "Text based content",
        "Other",
      ],
    },
    clientGenderPreference: {
      type: String,
      enum: ["Male", "Female", "Non-Binary", "Any"],
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
  },
  { timestamps: true }
);

//change the json to not send specified fields
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password; //remove the password
  return userObject;
};

// hash the password piror to save
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//check that given email and password exists
UserSchema.statics.checkCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ErrorResponse("Unable to login", 404);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorResponse("Unable to login", 404);
  }
  return user;
};
// Sign JWT and return the token
UserSchema.methods.getSginedJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET);
};

//create user model
const User = mongoose.model("User", UserSchema);

export default User;
