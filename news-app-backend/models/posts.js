const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postsSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'users',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    voteCount: {
      type: Number,
    },
    createdBy: { type: ObjectId },
    views: [
      {
        user: { type: ObjectId },
      },
    ],
    upvote: [
      {
        user: {
          type: ObjectId,
          ref: 'userModel',
        },
      },
    ],
    downvote: [
      {
        user: {
          type: ObjectId,
          ref: 'userModel',
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model('posts', postsSchema);
