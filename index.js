// set up ======================================================================
// get all the tools need
var express = require('express')
var app = express()
var port = process.env.PORT || 5000
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')

var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

var configDB = require('./models/database')

// configuration ===============================================================
mongoose.connect(configDB.url) // connect to database
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err))

require('./config/passport')(passport) // pass passport for configuration

// set up express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug') // set up pug for templating
app.use(express.static('public')) // set up static files in folder
// use connect-flash for flash messages stored in session
app.use(flash())

// session secret
app.use(session({
	secret: 'areyouhappynow',
	resave: false,
	saveUninitialized: true,
}))

// required for passport
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./routes/routes')(app, passport)

// launch ======================================================================
app.listen(port, () => console.log("Listening on Port " + port))