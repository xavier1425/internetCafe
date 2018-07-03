// set up ======================================================================
// get all the tools we need
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const configDB = require('./config/database.js')

// configuration ===============================================================
mongoose.connect(configDB.url) // connect to our database

require('./config/passport')(passport) // pass passport for configuration

// set up express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser()) // get information from html forms

app.set('view engine', 'pug') // set up pug for templating

// required for passport
app.use(session({ secret: 'areyouhappynow'})) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport) // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(PORT, () => console.log(`Listening on Port ${ PORT }`))