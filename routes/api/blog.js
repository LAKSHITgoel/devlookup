const express = require("express");
const router = express.Router();
const passport = require("passport");
const Blog = require("../../models/Blog");
const User = require("../../models/User");

//@route   api/blog/
//@desc    test api
//@access  PUBLIC
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "test api works",
    data: []
  });
});

//@route   api/blog/all
//@desc    gets all blogs
//@access  PUBLIC
router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdat: -1 })
    .then(blogs =>
      res
        .status(200)
        .json({ success: true, msg: "all blogs fetched", data: blogs })
    )
    .catch(err =>
      res.status(404).json({ success: false, msg: "error occured", error: err })
    );
});

//@route   api/blog/all
//@desc    get blog by id
//@access  PUBLIC
router.get("/:id", (req, res) => {
  Blog.findOne({ id: req.param.id })
    .then(blog =>
      res.status(200).json({ success: true, msg: "blog fetched", data: blog })
    )
    .catch(err =>
      res.status(400).json({ success: false, msg: "error occured", error: err })
    );
});

//@route   api/blog/user/blog
//@desc    get all blogs of a user
//@access  PUBLIC
router.get("/:userid/blogs", (req, res) => {
  User.findOne({ id: req.params.userid })
    .then(user => {
      Blog.find({ user: req.params.userid })
        .then(blogs =>
          res.status(200).json({
            success: true,
            msg: "all blog of user fetched",
            data: blogs
          })
        )
        .catch(err =>
          res.status(404).json({
            success: false,
            msg: "No blog found for the user",
            error: err
          })
        );
    })
    .catch(err =>
      res.status(404).json({ success: false, error: err, msg: "No user found" })
    );
});

//@route   api/blog/create
//@desc    create blog
//@access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let newBlog = {};
    console.log("request data", req.body);
    if (req.user.id) {

      //TODO:validation for empty blogs

      newBlog.user = req.user.id;
      newBlog.title = req.body.title;
      newBlog.author = req.body.author;
      newBlog.avatar = req.body.avatar;
      newBlog.parts = req.body.parts;

      new Blog(newBlog)
        .save()
        .then(nb => {
          if (nb)
            res
              .status(201)
              .json({ success: true, msg: "new blog created", data: nb });
        })
        .catch(err =>
          res.status(400).json({
            success: false,
            msg: "error in creating new blog",
            error: err
          })
        );
    } else {
      res.status(404).json({
        success: false,
        msg: "No userid found",
        error:
          "may be the user does not exists or may be there is a problem with the authentication"
      });
    }
  }
);

module.exports = router;
