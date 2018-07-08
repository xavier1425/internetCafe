// Add this require to the file
// var mongoose = require('mongoose')

// Add model require
var Product = require('../models/Product')

// Create controller object for CRUD operations
var productController = {}

// Add show list of products funciton
productController.list = (req, res) => {
	Product.find({}).exec((err, products) => {
		if (err) {
			console.log("Error:", err)
		} else {
			res.render('../views/products/index', {
				products: products,
				title: "商品列表"
			})
		}
	})
}

// Add show single product by id function
productController.show = (req, res) => {
	Product.findOne({_id: req.params.id}).exec((err, product) => {
		if (err) {
			console.log("Error:", err)
		} else {
			res.render('../views/products/show', {
				product: product,
				title: "商品內容"
			})
		}
	})
}

// Add create product funciton, it just redirects to create the page
productController.create = (req, res) => {
	res.render('../views/products/create', {
		title: "新增商品"
	})
}

// Add save new product funciton
productController.save = (req, res) => {
	var product = new Product(req.body)

	product.save((err) => {
		if (err) {
			console.log(err)
		} else {
			console.log("Successfully created a product.")
			res.redirect('/show/' + product._id)
		}
	})
}

// Add edit product by id function, it just redirects to edit page
productController.edit = (req, res) => {
	Product.findOne({_id: req.params.id}).exec((err, product) => {
		if (err) {
			console.log("Error:", err)
		} else {
			res.render('../views/products/edit', {
				product: product,
				title: "編輯商品"
			})
		}
	})
}

// Add update product funciton for updating currently editedproduct 
productController.update = (req, res) => {
	Product.findByIdAndUpdate(req.params.id, {
		$set: {
			name: req.body.name,
			unitPrice: req.body.unitPrice,
		}}, {new: true}, (err, product) => {
			if (err) {
				console.log(err)
				res.render('../views/products/edit', {
					product: req.body
				})
			}
			res.redirect('/show/' + product._id)
	})
}

// Add delete product by id function for remove single product data
productController.delete = (req, res) => {
	Product.remove({_id: req.params.id}, (err) => {
		if (err) {
			console.log(err)
		} else {
			console.log("Product deleted!")
			res.redirect('/edit')
		}
	})
}

module.exports = productController