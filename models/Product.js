// load the things we need
var mongoose = require('mongoose')

// define the schema for our products model
var productSchema = new mongoose.Schema({
    name     	: String,
    unitPrice   : Number,
    count	 	: { type: Number, default: 0 },
    updated_at	: { type: Date, default: Date.now }
})

// create the model for products and expose it to our app
module.exports = mongoose.model('Product', productSchema)