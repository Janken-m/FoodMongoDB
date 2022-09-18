const mongoose = require("mongoose");
require("mongoose-type-email");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: mongoose.SchemaTypes.Email, required: true },
  password: { type: String, required: true, minlength: 5 },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("users", UserSchema);

function ValidateUser(user) {
  const Schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  return Schema.validate(user);
}

module.exports = {
  User,
  validate: ValidateUser,
};
