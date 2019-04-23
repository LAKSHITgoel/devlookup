const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitiesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  sharedpost: [
    {
      type: Schema.Types.ObjectId,
      ref: "post"
    }
  ],
  sharedblog: [
    {
      type: Schema.Types.ObjectId,
      ref: "blog"
    }
  ],
  publish: [
    {
      type: Schema.Types.ObjectId,
      ref: "blog"
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post"
    }
  ]
});

module.exports = Activities = mongoose.model("activities", ActivitiesSchema);
