const express = require('express');
const router = express.Router();
const { userById } = require('../controllers/user');
const { requiredSignin } = require('../controllers/auth');
const { create } = require('../controllers/create');
const { upvote } = require('../controllers/upvote');
const { downvote } = require('../controllers/downvote');
const { getAllPost } = require('../controllers/getAllPost');
router.post('/post/create/:userId', requiredSignin, create);
router.get('/post/all', requiredSignin, getAllPost);

router.put('/post/upvote/:userId', requiredSignin, upvote);

router.put('/post/downvote/:userId', requiredSignin, downvote);

router.param('userId', userById);

module.exports = router;
