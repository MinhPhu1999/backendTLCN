'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    isAdmin:{
        type:Boolean,
        required:true
    },
    name:{
        type:String,
        required:[true,"Không được bỏ trống"]
    },
    email: {
        type: String,
        required: [true, "Không được bỏ trống"],
        index: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: {
        type: String,
        required: [true, "Không được bỏ trống"]
    },
    is_verify: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
});

module.exports = mongoose.model('user', user);