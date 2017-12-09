const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const passport = require('passport');
const router = express.Router();

// Load User Model
require('../models/User');
const User = mongoose.model('users');

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
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_message', 'Hey, you\'ve already got an account. Cool! Log in instead');
          res.redirect('/users/login');
        } else {
          const newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_message', 'Woohoo, you\'re signed up!');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      })


  }
});

module.exports = router;
