const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//  auth/github
router.get(
  "/",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    res.send("path:/auth/github");
  }
);

// auth/github/callback
router.get(
  "/callback",
  passport.authenticate("github", {
    session: false
  }),
  (req, res) => {
    if (req.user) {
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
