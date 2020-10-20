'use strict'
const category = require('../models/category.model');
exports.getCategory=(req,res)=>{
    category.find({},(err,res)=>{
        if(err){
            console.log(err);
        }
        res.status(200).json({data:docs});
    })
}
exports.getAll=async(req,res)=>{
    if(typeof req.params.page === 'undefined'){
        res.status(402).json({msg:'Data Invalid'});
        return;
    }
    let count = null;
    try{
        count = await category.count({});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:err});
        return;
    }
    let totalPage = parseInt(((count-1)/9)+1);
    let {page}=req.params;
    if ((parseInt(page) < 1) || (parseInt(page) > totalPage)) {
        res.status(200).json({ data: [], msg: 'Invalid page', totalPage });
        return;
    }
    category.find({})
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