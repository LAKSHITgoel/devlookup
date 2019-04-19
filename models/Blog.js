const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Blog Schema
const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String
  },
  parts: [
    {
      text: {
        type: String
      },
      image: {
        type: String
      },
      emmbed: {
        type: String
      },
      code: {
        type: String
      }
    }
  ],
  views: {
    type: Number
  },
  upvote: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  downvote: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  createdat: {
    type: Date,
    default: Date.now
  },
  share: {
    type: Number
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      createdat: {
        type: Date,
        default: Date.now
      },
      replies: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "refs"
          },
          text: {
            type: String
          },
          createdat: {
            type: Date,
            default: Date.now
          }
        }
      ]
    }
  ]
});

module.exports = Blog = mongoose.model("blog", BlogSchema);
