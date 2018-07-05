var title = "大都市網路咖啡館"

var Order = require('../app/models/order'), temp

Order.find({}, {"name":true,"_id":false,"price":true,"count":true}, (err, response) => {
	temp = response
})

module.exports = (app, passport) => {

	// =====================================
    // HOME PAGE ===========================
    // =====================================
	app.get('/', (req, res) => {
		Order.find({}, {"name":true,"_id":false,"price":true,"count":true}, (err, response) => {
			temp = response;
		})
		res.render('index', {
			title: title,
		})
	})

	app.get('/order', (req, res) => {
		Order.find({}, {"name":true,"_id":false,"price":true,"count":true}, (err, response) => {
			temp = response;
		})
		res.render('order', {
			title: title,
			data: temp
		})
	})
	app.post('/pay', (req, res) => {
		console.log(req.body.sum) // display total
		res.render('show_message', {
			title: title,
			order: req.body
		})
	})

	app.delete('/orders/:id', (req, res) => {
		Order.findByIdAndRemove(req.params.id, (err, response) => {
			if(err) res.json({message: "Error in deleting record id " + req.params.id})
			else res.json({message: "Person with id " + req.params.id + " removed."})	
		})
	})

	// =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
	app.get('/login', (req, res) => {

		// render the page and pass in any flash data if it exists
		res.render('login', {
			title: title,
			message: req.flash('loginMessage')
		})
	})
	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/edit',
		failureRedirect : '/login',
		failureFlash : true
	}))

	// // =====================================
 //    // SIGNUP ==============================
 //    // =====================================
 //    // show the signup form
	// app.get('/signup', (req, res) => {

	// 	// render the page and pass in any flash data if it exists
	// 	res.render('signup', {
	// 		title: title,
	// 		message: req.flash('signupMessage')
	// 	})
	// })
	// // process the signup form
	// app.post('/signup', passport.authenticate('local-signup', {
	// 	successRedirect : '/profile',
	// 	failureRedirect : '/signup',
	// 	failureFlash : true
	// }))

	// =====================================
    // EDIT ================================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
	app.get('/edit', isLoggedIn, (req, res) => {
		Order.find({}, {"name":true,"_id":false,"price":true,"count":true}, (err, response) => {
			temp = response;
		})
		res.render('edit', {
			title: title,
			user: req.user, // get the user out of session and pass to template
			data: temp
		})
	})
	app.post('/edit', (req, res) => {
		var orderInfo = req.body;

		if(!orderInfo.name || !orderInfo.price) {
			res.render('show_message', {
				title: title,
				message: "提供的資料不正確，請重新輸入！", type: "error"});
		} else {
			var newOrder = new Order({
				name: orderInfo.name,
				price: orderInfo.price,
				count: orderInfo.count
			})

			newOrder.save((err, Order) => {
				if(err)
					res.render('show_message', {message: "Database error", type: "error"});
				else {
					res.render('show_message', {
						title: title,
						message: "新增商品成功!", type: "success", order: orderInfo
					});
					console.log(req.body) // display create product
				}
			});
		}
	})

	// =====================================
    // LOGOUT ==============================
    // =====================================
	app.get('/logout', (req, res) => {
		req.logout()
		res.redirect('/')
	})
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if(req.isAuthenticated())
		return next()

	// if they aren't redirect them to the home page
	res.redirect('/')
}