const { validate, User } = require("../models/User");
const bcrypt = require("bcrypt");
// const auth = require("../middleware/auth");
// const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

// router.get("/me", [auth, admin], async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");

//   if (!user) return res.status(400).send("User not found");

//   return res.send(user);
// });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const excitedUser = await User.findOne({ email: req.body.email });
  if (excitedUser) return res.status(400).send("User already registerd");

  const user = new User(req.body);

  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const { password, ...userWithoutPass } = user.toObject();
  const token = user.generateAuthToken();

  return res.status(201).header("x-auth-token", token).send(userWithoutPass);
});

module.exports = router;
