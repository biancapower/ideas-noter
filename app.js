const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Map global promise (gets rid of warning "DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html")
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/ideasnoter-dev', {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
  const title = "Ideas Noter"
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
})

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
})

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});
