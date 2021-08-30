const Posts = require('../models/posts');
const errorHandler = require('../helpers/dbErrorHandler');

exports.downvote = (req, res) => {
  const { postId } = req.body;
  const downvoteUser = { user: req.profile._id };
  Posts.findOne({ _id: postId }).then((post) => {
    if (post.downvote.filter((user) => req.profile._id).length === 1) {
      Posts.update(
        { _id: postId },
        { $pull: { downvote: downvoteUser } },
        function (error, success) {
          if (error) {
            return res.status(422).json(errorHandler(err));
          } else {
            res.status(200).json({
              downvote: false,
            });
          }
        }
      );
    } else {
      Posts.update(
        { _id: postId },
        { $push: { downvote: downvoteUser } },
        function (error, success) {
          if (error) {
            return res.status(422).json({ error: err });
          } else {
            Posts.update(
              { _id: postId },
              { $pull: { upvote: downvoteUser } },
              function (error, success) {
                if (error) {
                  return res.status(422).json({ error: err });
                } else {
                  res.status(200).json({
                    downvote: true,
                  });
                }
              }
            );
          }
        }
      );
    }
  });
};
