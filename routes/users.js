const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Signup Route
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

// Signup Form POST
router.post('/signup', (req, res) => {
  let errors = [];

  if(req.body.password != req.body.password2) {
    errors.push({text: 'Passwords don\'t match'});
  }

  if(req.body.password.length < 4) {
    errors.push({text: 'Passwords must be at least 4 characters'});
  }

  if(errors.length > 0) {
    res.render('users/signup', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    })
  } else {
    res.send('passed');
  }
});

module.exports = router;
