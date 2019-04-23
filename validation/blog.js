const validator = require("validator");
// const isEmpty = require("./is-empty");

module.exports = function validateBlogInput(data) {
  let errors = {};

  if (validator.isEmpty(data.author)) errors.author = "Author is required";
  if (validator.isEmpty(data.avatar)) errors.avatar = "User Avatar is Required";
  if (validator.isEmpty(data.title))
    errors.title = "Title for your log is required";
  if (Array.isArray(data.parts) && data.parts.length < 1)
    errors.parts = "Please Write something for your blog";
  
};
