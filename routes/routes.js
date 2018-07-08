// Add require that point to Product controller
var product = require('../controllers/productController')
// Rquire Index controller to view homepage
var index = require('../controllers/indexController')

module.exports = (router, passport) => {
	// HOME PAGE ===========================
	router.get('/', index.home)

	// LOGIN PAGE ==========================
	router.get('/login', index.login)

	// process the login form
	router.post('/login', passport.authenticate('local-login', {
		successRedirect : '/order',
		failureRedirect : '/login',
		failureFlash : true
	}))

	// ADMIN LOGIN PAGE ==========================
	router.get('/admin', index.admin)

	// process the login form (admin)
	router.post('/admin', passport.authenticate('local-login', {
		successRedirect : '/edit',
		failureRedirect : '/admin',
		failureFlash : true
	}))

	// SIGNUP PAGE =========================
	router.get('/signup', index.signup)

	// // process the signup form
	// router.post('/signup', passport.authenticate('local-signup', {
	// 	successRedirect : '/order',
	// 	failureRedirect : '/signup',
	// 	failureFlash : true
	// }))

	// ORDER PAGE ==========================
	router.get('/order', isLoggedIn, index.list)

	// Pick up the bill
	router.post('/pay', isLoggedIn, index.pay)

	// EDIT ================================
	// we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
	router.get('/edit', isLoggedIn, product.list)

    // LOGOUT ==============================
	router.get('/logout', (req, res) => {
		req.logout()
		res.redirect('/')
	})

	// Get single product by id
	router.get('/show/:id', isLoggedIn, product.show)

	// Create product
	router.get('/create', isLoggedIn, product.create)

	// Save product
	router.post('/save', isLoggedIn, product.save)

	// Edit product
	router.get('/edit/:id', isLoggedIn, product.edit)

	// Edit update
	router.post('/update/:id', isLoggedIn, product.update)

	// Delete product
	router.post('/delete/:id', isLoggedIn, product.delete)
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if(req.isAuthenticated())
		return next()

	// if they aren't redirect them to the home page
	res.redirect('/')
}