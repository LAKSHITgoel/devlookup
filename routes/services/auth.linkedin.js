const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

router.get(
  "/",
  passport.authenticate("linkedin"),
  (req, res) => {
    res.send("user");
    res.json(JSON.parse(req.user));
  }
);

router.get(
  "/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

module.exports = router;
