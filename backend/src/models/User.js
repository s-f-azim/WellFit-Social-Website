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
    tags: {
      type: [String],
      validate: v => { //Checks if array of tags inputted is subset of preset of tags
        const tags = ['#GetFit',
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
                      '#Workout'];
        v.every(val => tags.includes(val));
      },
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
