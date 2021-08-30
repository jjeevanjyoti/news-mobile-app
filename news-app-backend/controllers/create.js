const Posts = require('../models/posts');
const errorHandler = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const post = new Posts(req.body);
  post.createdBy = req.profile._id;
  post.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
