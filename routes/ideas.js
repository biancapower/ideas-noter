const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');


// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea Index page
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({})
    .sort({date: 'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas:ideas
      });
    })

});

// Add Idea Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('ideas/add');
});

// Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      res.render('ideas/edit', {
        idea: idea
      });
    });
});

// Process Idea Add Form
router.post('/', ensureAuthenticated, (req, res) => {

  // server-side validation
  let errors = [];

  if(!req.body.title){
    errors.push({text: 'Please add a title'});
  }

  if(!req.body.details){
    errors.push({text: 'Please add some details'});
  }

  if(errors.length > 0){
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save()
      .then( idea => {
        req.flash('success_message', 'Idea added');
        res.redirect('/ideas');
      })
  }
});

// Edit Idea Form Process
router.put('/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      // update values
      idea.title = req.body.title;
      idea.details = req.body.details;

      idea.save()
        .then(idea => {
          req.flash('success_message', 'Idea updated');
          res.redirect('/ideas');
        })
    });
});

// Delete Idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_message', 'Idea deleted');
      res.redirect('/ideas');
    })
});

module.exports = router;
