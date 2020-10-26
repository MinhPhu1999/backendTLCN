'use strict'
const product = require('../models/product.model');
const brand = require('../models/brand.model');
const category=require('../models/category.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;

var uploads = {};
cloudinary.config({
    cloud_name: 'dpa6e5lwv',
    api_key: '319431445471854',
    api_secret: 'k4z82XS4CbAVrLubmo_kFbS3A4I'
});

const uploadImg = async (path) => {
    let res;
    try {
        res = await cloudinary.uploader.upload(path);
    }
    catch(err) {
        //console.log(err);
        console.log('khong upload anh duoc');
        return false;
    }
    return res.secure_url;
}

exports.addProduct = async (req, res) => {
    if(typeof req.file === 'undefined' 
    || typeof req.body.name === 'undefined' 
    || typeof req.body.id_category === 'undefined' 
    || typeof req.body.price === 'undefined' 
    || typeof req.body.id_brand === 'undefined' 
    || typeof req.body.description === 'undefined'
    ) {
        //res.status(442).json({msg:req.body});
        res.status(422).json({ msg: 'Invalid data o day' });
        return;
    }
    console.log(req.body);
    const {name, id_category, price, id_brand, description} = req.body;
    let urlImg = await uploadImg(req.file.path);
    
    if(urlImg === false) {
        res.status(500).json({msg: 'server error 1'});
        return;
    }
    const newProduct = new product({
        id_category:id_category,
        name: name,
        price: price,
        id_brand: id_brand,
        img: urlImg,
        description: description,
        countInStock:1,
        rating:5,
        numReviews:2
    });
    try{
        newProduct.save()
    }
    catch(err) {
        res.status(500).json({msg: 'server error 2'});
        return;
    }
    // fs.unlink(req.file.path, (err) => {
    //     if (err) throw err;
    //     console.log('path/file.txt was deleted');
    //   });
    res.status(201).json({msg: 'success'})
}

exports.updateProduct = async (req, res) => {
    if( typeof req.body.name === 'undefined' 
    || typeof req.body.id === 'undefined' 
    || typeof req.body.id_category === 'undefined' 
    || typeof req.body.price === 'undefined' 
    || typeof req.body.id_brand === 'undefined' 
    || typeof req.body.description === 'undefined' 
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name, id, id_category, price, id_brand, description} = req.body;
    let productFind;
    try {
        productFind = await product.findById(id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    if (productFind === null) {
        res.status(404).json({ msg: "Not found" });
        return;
    }
    let urlImg = null;
    if(typeof req.file !== 'undefined' ) {
        urlImg = await uploadImg(req.file.path)
    }
    if(urlImg !== null) {
        if(urlImg === false) {
            res.status(500).json({msg: 'server error'});
            return;
        }
    }
    if(urlImg === null)
        urlImg = productFind.img;
    
    productFind.id_category = id_category;
    productFind.name = name;
    productFind.price = parseFloat(price)
    productFind.id_brand = id_brand;
    productFind.description = description;
    productFind.img = urlImg;
    productFind.save((err, docs) => {
        if (err) {
            console.log(err);
        }
    });
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
    res.status(200).json({ msg: 'success', data: productFind });
}



exports.deleteProduct = async (req, res) => {
    if (typeof req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    
    try {
        await product.findOneAndDelete(req.params.id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    res.status(200).json({ msg: 'success', });
}

exports.getAllProduct=async(req,res)=>{
    // if(typeof req.params.page === 'undefined') {
    //     res.status(402).json({msg: 'Data invalid'});
    //     return;
    // }
    let count = null;
    try { 
        count = await product.count({});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({msg: err});
        return;
    }
    let totalPage = parseInt(((count - 1) / 9) + 1);
    let { page } = req.params;
    if ((parseInt(page) < 1) || (parseInt(page) > totalPage)) {
        res.status(200).json({ data: [], msg: 'Invalid page', totalPage });
        return;
    }
    product.find({})
    .skip(9 * (parseInt(page) - 1))
    .limit(9)
    .exec((err, docs) => {
        if(err) {
            console.log(err);
                    res.status(500).json({ msg: err });
                    return;
        }
        res.status(200).json({ data: docs, totalPage });
    })
}

exports.updateAllPriceBrand=async(req,res)=>{
    if(req.params.id_brand === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    
}