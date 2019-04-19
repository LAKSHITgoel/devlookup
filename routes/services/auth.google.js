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
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"]
  }),
  (req, res) => {
    // res.send("user");
    // res.json(JSON.parse(req.user));
  }
);

router.get(
  "/callback",
  passport.authenticate("google", {
    // successRedirect: "/",
    // failureRedirect: "/login",
    session: false
  }),
  (req, res) => {
    if (req.user) {
      // console.log("user",req.user)
      console.log("user authnticated", req.user._doc.name);
      // Create JWT Payload
      const payload = {
        id: req.user._doc._id,
        name: req.user._doc.name,
        avatar: req.user._doc.avatar
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: Number(7 * 24 * 60 * 60 * 1000) },
        (err, token) => {
          res.render("callback", {
            token: "Bearer " + token,
            redirectURL: req.user.redirectURL
          });
        }
      );
    } else {
      console.log("Unauthorized User");
      res.redirect("/login");
    }
  }
);

module.exports = router;
