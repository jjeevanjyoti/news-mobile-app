const Posts = require('../models/posts');
const errorHandler = require('../helpers/dbErrorHandler');

exports.upvote = (req, res) => {
  const { postId } = req.body;
  const upvoteUser = { user: req.profile._id };
  Posts.findOne({ _id: postId }).then((post) => {
    if (post.upvote.filter((user) => req.profile._id).length === 1) {
      Posts.update(
        { _id: postId },
        { $pull: { upvote: upvoteUser } },
        function (error, success) {
          if (error) {
            return res.status(422).json({ error: err });
          } else {
            res.status(200).json({
              upvote: false,
            });
          }
        }
      );
    } else {
      Posts.update(
        { _id: postId },
        { $push: { upvote: upvoteUser } },
        function (error, success) {
          if (error) {
            return res.status(422).json({ error: err });
          } else {
            Posts.update(
              { _id: postId },
              { $pull: { downvote: upvoteUser } },
              function (error, success) {
                if (error) {
                  return res.status(422).json(errorHandler(err));
                } else {
                  res.status(200).json({
                    upvote: true,
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
