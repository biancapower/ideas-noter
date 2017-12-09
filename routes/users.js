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

module.exports = router;
