'use strict'
const cart_controller = require('../controllers/cart.controller');
module.exports = (app) => {
    app.route('/cart')
		.get(cart_controller.getCart);
		
    app.route('/cart/all')
		.get(cart_controller.getAll);
		
	app.route('/cart/addcart')
		.post(cart_controller.addToCart);
		
    app.route('/cart/updatecart')
		.post(cart_controller.updateCart);
		
    app.route('/cart/delete/:id')
        .post(cart_controller.deleteCart);
}