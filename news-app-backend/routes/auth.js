const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requiredSignin,
} = require('../controllers/auth');

// adding req check validator
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);

router.post('/signin', signin);

router.get('/signout', signout);

//PROTECTED ROUTE
router.get('/hello', requiredSignin, (req, res) => {
  res.send('hello login user');
});

module.exports = router;
