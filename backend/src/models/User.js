import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";

//create user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Please add an email address"],
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is Invalid");
      },
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

    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 8,
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
      enum: ["male", "female", "any"],
    },

    isPregnant: Boolean,

    fitnessLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
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
        enum: ["dumbbells", "barbells", "resistanceBands", "treadmill"],
      },
    ],

  },
  { timestamps: true }
);

//change the json to not send specified fields
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password; //remove the password
  return userObject;
};

// hash the password prior to save
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//check that given email and password exists
userSchema.statics.checkCredentials = async ({ email, password }) => {
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
userSchema.methods.getSginedJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET);
};

//create user model
const User = mongoose.model("User", userSchema);

export default User;
