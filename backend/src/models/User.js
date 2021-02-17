import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
  },
  { timestamps: true }
);

// hash the password piror to save
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.has(this.password, 10);
  }
  next();
});

//create user model
const User = mongoose.model("User", UserSchema);

export default User;
