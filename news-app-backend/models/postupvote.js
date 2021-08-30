const mongoose = require('mongoose');
const { objectId } = mongoose.Schema;
const postUpvoteSchema = new mongoose.Schema({
  postId: {
    type: objectId,
    ref: 'postsModel',
  },
  votes: [
    {
      user: {
        type: objectId,
        ref: 'userModel',
      },
    },
  ],
});

module.exports = mongoose.model('PostUpvoteSchema', postUpvoteSchema);
