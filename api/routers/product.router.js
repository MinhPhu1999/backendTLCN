'use strict'
const product_controller = require('../controllers/product.controller');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './files/',
    filename: (req, file, cb) =>{
        let filename=`${Date.now()}-${file.originalname}`;
       cb(null,filename);
    }
  })
const upload = multer({ storage:storage });


module.exports = (app) => {
    app.route('/product/addproduct')
        .post(upload.single('file'),product_controller.addProduct);

    app.route('/product/updateproduct')
        .post(upload.single('file'),product_controller.updateProduct);

    app.route('/product/deleteproduct/:id')
        .get(product_controller.deleteProduct);

    app.route('/product/getallproduct')
        .get(product_controller.getAllProduct);

    app.route('/product/updateallpricebrand/:id_brand')
        .get(product_controller.updateAllPriceBrand);
}