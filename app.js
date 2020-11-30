// Initialize express
const express = require('express')
const methodOverride = require('method-override')

const app = express()

const jwt = require('jsonwebtoken');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

const models = require('./db/models');

const cookieParser = require('cookie-parser');


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(function authenticateToken(req, res, next) {
  // Gather the jwt access token from the cookie
  const token = req.cookies.mpJWT;

  if (token) {
    jwt.verify(token, "AUTH-SECRET", (err, user) => {
      if (err) {
        console.log(err)
        // redirect to login if not logged in and trying to access a protected route
        res.redirect('/login')
      }
      req.user = user
      next(); // pass the execution off to whatever request the client intended
    })
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  console.log("lookingUpUser:", req.user);
  // if a valid JWT token is present
  if (req.user) {
    // Look up the user's record
    console.log("Req.User:", req.user);
    models.User.findByPk(req.user.id).then(currentUser => {
      console.log("currentUser:", currentUser);
      // make the user object available in all controllers and templates
      res.locals.currentUser = currentUser;
      next();
    }).catch(err => {
      console.log(err);
    })
  } else {
    next();
  }
});

// require handlebars
const exphbs = require('express-handlebars');

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));

// Use handlebars to render
app.set('view engine', 'handlebars');

require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);
require('./controllers/auth')(app, models);


// Choose a port to listen on
const port = process.env.PORT || 3001;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3001!')
})
