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
Order.find({}, {"name":true,"_id":false,"price":true,"count":true}, (err, response) => {
	temp = response;
});

module.exports = (app) => {

	app.get('/', (req, res) => {
		Order.find({}, {"name":true,"_id":false,"price":true,"count":true}, (err, response) => {
			temp = response;
		});
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
		res.render('order', {
			title: title,
			subtitle: subtitle,
			data: temp
		});
	})
	app.post('/order', (req, res) => {
		var orderInfo = req.body;

		if(!orderInfo.name || !orderInfo.price) {
			res.render('show_message', {
				title: title,
				subtitle: subtitle,
				message: "提供的資料不正確，請重新輸入！", type: "error"});
		} else {
			var newOrder = new Order({
				name: orderInfo.name,
				price: orderInfo.price,
				count: orderInfo.count
			});

			newOrder.save((err, Order) => {
				if(err)
					res.render('show_message', {message: "Database error", type: "error"});
				else {
					res.render('show_message', {
						title: title,
						subtitle: subtitle,
						message: "新增商品成功!", type: "success", order: orderInfo
					});
				}
			});
		}
	})

	app.post('/pay', (req, res) => {
		console.log(req.body.sum);
		res.render('show_message', {
			title: title,
			subtitle: subtitle,
			order: req.body
		});
	})
	app.get('/edit', (req, res) => {
		res.render('edit', {
			title: title,
			subtitle: subtitle,
			data: temp
		});
	})
}