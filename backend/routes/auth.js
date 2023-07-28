const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const fetchUser = require("../middleware/fetchUser.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret_key = "HiIamAGirl";
//Route 1: create a user using: Post "api/auth/createuser" .  No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let salt = await bcrypt.genSaltSync(10);
      let securePassword = await bcrypt.hashSync(req.body.password, salt);
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, errors: "Please enter a unique value for Email" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });
      const data = {
        // user:{
        id: user.id,
        // }
      };
      const authtoken = jwt.sign(data, secret_key);
      // res.send(user)
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("something went wrong");
    }
  }
);

//Route 2 : Authenticating a user using: Post "api/auth/login" .  No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please enter valid credentials" });
      }
      let passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please enter valid credentials" });
      }
      const data = {
        // user:{
        id: user.id,
        // }
      };
      const authtoken = jwt.sign(data, secret_key);
      // res.send(user)
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);
//Route 3 : get login user details using: Post "api/auth/getuser" . login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
