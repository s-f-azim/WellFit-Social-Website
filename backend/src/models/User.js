import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    weight: {
        type: Number,
        min: 0,
        validate : {
            validator : Number.isInteger
        }
    },

    height: {
        type: Number,
        min: 0,
        validate : {
            validator : Number.isInteger
        }
    },

    bmi: {
        type: Number,
        min: 0,
        validate : {
            validator : Number.isInteger
        }
    },

    preferredGender: {
        type: String,
        enum: ["male", "female", "any"]
    },
    
    isPregnant: Boolean,

    fitnessLevel: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"]
    },

});

const User = mongoose.model("User", userSchema);

export default User;