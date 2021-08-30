const Posts = require('../models/posts');
const errorHandler = require('../helpers/dbErrorHandler');

exports.getAllPost = (req, res) => {
  Posts.find({}, function (err, posts) {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    return res.status(200).json({ data: posts });
  });
};
