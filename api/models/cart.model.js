'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = new Schema ({
    id_user: {
        type: String,
    },
    // id_product:{
    //     type:String,
    //     required:[true,"Không được bỏ trống"]
    // },
    date: {
        type: Date,
        default: new Date()
    },
    name:{
        type:String,
        required:[true,"Không được bỏ trống"],
        index:true
    },
    count:{
        type:Number,
        required:[true, "Không được bỏ trống"]
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
    img:{
        type:String,
        required:[true,"Không được bỏ trống"]
    },
    id_brand:{
        type:String,
        required:[true,"Không được bỏ trống"],
        index:true
    },
    status:{
        type:Boolean
    }
});

module.exports = mongoose.model('cart', cart);