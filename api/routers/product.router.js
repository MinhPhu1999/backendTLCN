'use strict'
const product_controller = require('../controllers/product.controller');
module.exports = (app) => {
    app.route('/product/add')
        .post(product_controller.addProduct);
}