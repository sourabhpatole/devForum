const mongoose = require("mongoose");
const validate = require("validator");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validate.isEmail(value)) {
          throw new Error("invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validate.isStrongPassword(value)) {
          throw new Error("Password is not strong!!");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(sourabh) {
        if (!["male", "female", "other"].includes(sourabh)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validate.isURL(value)) {
          throw new Error("photo url is not correct");
        }
      },
    },
    about: {
      type: String,
      default: "This is default about of the user",
      validate(demo) {
        if (demo.length > 200) {
          throw new Error("about is more than 20 letters");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
