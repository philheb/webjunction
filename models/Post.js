const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  // Link the user (author) to the post
  // Posts are not deleted if user close his account*****
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  // Text
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    // User can 'like' ONCE and take their 'like' back
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      // likes: [
      //   // User can like comments?
      //   {
      //     user: {
      //       type: Schema.Types.ObjectId,
      //       ref: 'users',
      //     },
      //   },
      // ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Post = mongoose.model('post', PostSchema)
