// Initialize express
const express = require('express')
const methodOverride = require('method-override')

const app = express()

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

const models = require('./db/models');
require('./controllers/events')(app, models);


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

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


// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
