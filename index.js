const express = require('express')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const Passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const routes = require('./routes/router')
const app = express()

var users = {
	zack: {
		username: 'zack',
		password: '1234',
		id: 1,
	},
	node: {
		username: 'node',
		password: '1111',
		id: 2,
	}
}

var localStrategy = new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	},
	function(username, password, done) {
		user = users[username];

		if(user == null) {
			return done(null, false, { message: 'Invalid user' })
		}

		if(user.password !== password) {
			return done(null, false, { message: 'Invalid password' })
		}

		done(null, user)
	}
)

app.set('view engine', 'pug')
app.set('views', './views')

Passport.use('local', localStrategy)
app.use(Passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(upload.array())
app.use(express.static('public'))

routes(app)

app.post('/login',
	Passport.authenticate('local', { session: false }),
	function(req, res) {
		res.send('User ID' + req.user.id)
	}
)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))