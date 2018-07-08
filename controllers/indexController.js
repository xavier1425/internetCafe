// Add model require
var Product = require('../models/Product')

// Create controller object for routes
var indexController = {}

var title = "大都市網路咖啡館"

// Show Homepage
indexController.home = (req, res) => {
	res.render('../views/index/index', {
		title: title
	})
}

// Show list of products
indexController.list = (req, res) => {
	Product.find({}, {"name":true,"_id":false,"unitPrice":true,"count":true}).exec((err, products) => {
		if (err) {
			console.log("Error:", err)
		} else {
			res.render('../views/index/order', {
				products: products,
				title: title
			})
		}
	})
}

// Add pay action function
indexController.pay = (req, res) => {
	console.log(req.body.sum) // display total
	res.render('../views/index/show_message', {
		title: title,
		order: req.body
	})
}

// Login function
indexController.login = (req, res) => {
	// render the page and pass in any flash data if it exists
	res.render('../views/index/login', {
		title: title,
		message: req.flash('loginMessage')
	})
}

// Show the signup form
indexController.signup = (req, res) => {
	// render the page and pass in any flash data if it exists
	res.render('../views/index/signup', {
		title: title,
		message: req.flash('signupMessage')
	})
}

module.exports = indexController