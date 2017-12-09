const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// User Login Route
router.get('/login', (req, res) => {
  res.send('login')
});

// User Signup Route
router.get('/signup', (req, res) => {
  res.send('signup')
});

module.exports = router;
