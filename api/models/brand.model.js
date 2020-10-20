'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const brand = new Schema({
    name: {
        type: String,
        required: [true, "Không được bỏ trống"],
    },
});
module.exports = mongoose.model('brand', brand);