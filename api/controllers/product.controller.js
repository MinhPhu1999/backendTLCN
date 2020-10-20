'use strict'
const product = require('../models/product.model');
exports.addProduct = async(req, res)=>{
    const {id_product, name} = req.body;
    const newproduct = new product({
        id_product:id_product,
        name: name
    })
    try{
        newproduct.save()
    }
    catch(err) {
        res.status(500).json({msg: 'server error'});
        return;
    }
}