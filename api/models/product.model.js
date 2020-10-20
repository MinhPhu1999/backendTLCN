'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = new Schema({
    name:{
        type:String,
        required:[true,"Không được bỏ trống"],
        index:true
    },
    price:{
        type:Number,
        required:[true,"Không được bỏ trống"],
    },
    id_category:{
        type:String,
        required:[true,"Không được bỏ trống"],
        index:true
    },
    image:{
        type:String,
        required:[true,"Không được bỏ trống"]
    },
    id_brand:{
        type:String,
        required:[true,"Không được bỏ trống"],
        index:true
    },
    descripton:{
        type:String,
        required:[true,"Không  được bỏ trống"]
    },
    rating:{
        type:Number,
        required:[true,"Không được bỏ trống"]
    },
    numReviews:{
        type:Number,
        required:[true,"Không được bỏ trống"]
    },
    countInStock:{
        type:Number,
        required:[true,"Không được bỏ trống"]
    }
});

module.exports = mongoose.model('product', product);