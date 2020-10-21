'use strict'
const product_controller = require('../controllers/product.controller');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './files',
    filename: (req, file, cb) =>{
        //cb(`${file.originalname}`);
       cb(null,file.originalname);
    }
  })
const upload = multer({ storage });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
        
//         cb(null, './files/'); //hỉnh ảnh sẽ chưa trong folder uploads
       
//     },
//     filename: (req, file, cb) => {
//         cb(null , file.originalname); ;// mặc định sẽ save name của hình ảnh
//         // là name gốc, chúng ta có thể rename nó.  
//     }
// })

// const upload = multer({storage:storage});


module.exports = (app) => {
    app.route('/product/addproduct')
        .post(upload.single('file'),product_controller.addProduct);

    app.route('product/updateproduct')
        .post(upload.single('file'),product_controller.updateProduct);
    
    app.route('product/deleteproduct/:id')
        .get(product_controller.deleteProduct);
}