const mongoose = require('mongoose');
const { objectId } = mongoose.Schema;
const postDownvoteShema = new mongoose.Schema({
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

module.exports = mongoose.model('PostDownvoteShema', postDownvoteShema);
