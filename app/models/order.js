// load the things we need
var mongoose = require('mongoose')

// define the schema for our products model
var orderSchema = mongoose.Schema({
	
    name     : String,
    price    : Number,
    count	 : Number
})

// create the model for products and expose it to our app
module.exports = mongoose.model('Order', orderSchema)