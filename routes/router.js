var title = "大都市網路咖啡館",
	subtitle = "網咖點餐系統";

var mongoose = require('mongoose');
mongoose.connect('mongodb://user:jumiya009@ds159110.mlab.com:59110/star-war-quotes');

var orderSchema = mongoose.Schema({
	name: String,
	price: Number,
	count: Number
});
var Order = mongoose.model("Order", orderSchema);

var temp;
Order.find((err, response) => {
	temp = response;
});

module.exports = (app) => {

	app.get('/', (req, res) => {
		res.render('index', {
			title: title,
			subtitle: subtitle
		});
	})
	app.post('/', (req, res) => {

	})

	app.get('/order', (req, res) => {
		Order.find({}, {"name":true,"_id":false,"price":true,"count":true}, (err, response) => {
			temp = response;
		});
		res.render('order',{
			title: title,
			subtitle: subtitle,
			data: temp,
		});
	})
	app.post('/order', (req, res) => {
		var orderInfo = req.body;

		if(!orderInfo.name) {
			res.render('show_message', {
				message: "Sorry, you provided worng info", type: "error"});
		} else {
			var newOrder = new Order({
				name: orderInfo.name,
				price: orderInfo.price,
				count: orderInfo.count
			});

			newOrder.save((err, Order) => {
				if(err)
					res.render('show_message', {message: "Database error", type: "error"});
				else
					res.render('show_message', {
						message: "New order added!", type: "success", order: orderInfo});
			});
		}
	})

	app.post('/pay', (req, res) => {
		console.log(req.body.sum);
		res.render('show_message',{
			title: title,
			subtitle: subtitle,
			order: req.body
		});
	})
}