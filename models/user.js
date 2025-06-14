const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { AuthError, BadRequestError } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.matches(value, /.+@.+\..*/);
      },
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  if (!email || !password)
    throw new BadRequestError("Not enough data to login");
  const user = await this.findOne({ email }).select("+password");
  if (!user) throw new AuthError();
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw new AuthError();
  return user;
};

module.exports = mongoose.model("user", userSchema);
