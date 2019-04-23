const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Blog Schema
const BlogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  author: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  parts: [
    {
      index: {
        type: Number,
        required: true
      },
      subtitle: {
        type: String
      },
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
  shares: {
    type: Number
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      avatar: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
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
          avatar: {
            type: String,
            required: true
          },
          author: {
            type: String,
            required: true
          },
          text: {
            type: String,
            required: true
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
