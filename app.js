const express = require('express');
const path = require('path'); // core node module, doesn't require installation
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load Routes
const ideas = require('./routes/ideas')
const users = require('./routes/users')

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/database')

// Map global promise (gets rid of warning "DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html")
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect(db.mongoURI, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public'))); // sets express static folder to 'public' folder

// Method Override Middleware
app.use(methodOverride('_method'));

// Express Sessions Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport Middleware (MUST be after 'Express Sessions Middleware')
app.use(passport.initialize());
app.use(passport.session());

// Flash Middleware
app.use(flash());

// Global Variables
app.use(function(req, res, next) {
  res.locals.success_message = req.flash('success_message'); // for Flash Messages
  res.locals.error_message = req.flash('error_message'); // for Flash Messages
  res.locals.error = req.flash('error'); // for use with passport
  res.locals.user = req.user || null; // to check if there is a user logged in
  next();
});

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
});

// Use Routes
app.use('/ideas', ideas); // anything that uses /ideas will go to the ideas routes file
app.use('/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});
