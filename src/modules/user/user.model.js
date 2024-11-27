import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// EMAIL REGEX
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// USER SCHEMA
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required."],
        minLength: [3, "The length of user name can be minimum 3 characters"],
        maxLength: [30, "The length of user name can be maximum 30 characters"]
    },
    email: {
        type: String,
        required: [true, "User email is required."],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return emailRegex.test(v)
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "User password is required."],
        minLength: [6, "The length of user password can be minimum 6 characters"],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
}, { timestamps: true });


// USER MODEL
const User = mongoose.model("User", userSchema);

export default User;