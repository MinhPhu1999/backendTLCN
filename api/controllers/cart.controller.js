"use strict";
const cart = require("../models/cart.model");
exports.addToCart = async (req, res) => {
  //console.log("test");
  if (typeof req.body.id_user === "undefined") {
      res.status(422).json({ msg: "invalid data" });
    return;
  }
  const { id_user, id_product, date, name, count, price, id_category, img, id_brand } = req.body;
  let cartFind = null;
  //cartFind = await cart.findOne({ id_user: id_user });
  try {
    cartFind = await cart.findOne({ id_user: id_user });
  }
  catch (err) {
    const cart_new = new cart({
      id_user: id_user,
      id_product: id_product,
      date: date,
      name:name,
      count:count,
      price:price,
      id_category:id_category,
      img:img,
      id_brand:id_brand,
      status:true
    });
    //let cartsave;
    try {
      await cart_new.save();
      console.log("thanh cong 1");
    } catch (err) {
      console.log("loi 1");
      res.status(500).json({ msg: "loi 1" });
      //res.status(500).json({ msg: err });
      return;
    }
    return;
  }
  if (cartFind === null) {
    const cart_new = new cart({
      id_user: id_user,
      id_product:id_product,
      date: date,
      name:name,
      count:count,
      price:price,
      id_category,
      img:img,
      id_brand:id_brand,
      status:true
    });
    //let cartsave;
    try {
      await cart_new.save();
      console.log("thanh cong 2");
    } catch (err) {
      //console.log("loi 2");
      res.status(500).json({ msg: err });
      return;
    }
    return;
  }
//   for (let i = 0; i < products.length; i++) {
//     let index = cartFind.products.findIndex(
//       element => products[i]._id === element._id
//     );
//     if (index === -1) {
//       cartFind.products.push(products[i]);
//     } else {
//       cartFind.products[index].count += Number(products[i].count);
//     }
//   }

//   try {
//     await cart.findByIdAndUpdate(cartFind._id, {
//       $set: { products: cartFind.products }
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//     return;
//   }
  res.status(200).json({ msg: "success" });
}

exports.getCart = async(req,res)=>{
  cart.find({status:true},(err,res)=>{
    if(err){
        res.status(422).json({msg:err});
        return;
    }
    res.status(200).json({data:docs});
})
}

exports.getAll = async (req, res) => {
  if (typeof req.params.id_user === "undefined") {
    res.status(422).json({ msg: "invalid data" });
    return;
  }
  cart.findOne({ id_user: req.params.id_user }, (err, docs) => {
    if (err) {
      res.status(500).json({ msg: err });
      return;
    }
    res.status(200).json({ data: docs });
  });
}

exports.updateCart = async (req, res) => {
  if (typeof req.body.id_user === "undefined"
    || typeof req.body.id_product === 'undefined'
    || typeof req.body.date === "undefined"
    || typeof req.body.name === "undefined"
    || typeof req.body.count === "undefined"
    || typeof req.body.price=== "undefined"
    || typeof req.body.id_category === "undefined"
    || typeof req.body.id_brand === "undefined"
  ) {
    res.status(422).json({ msg: "invalid data" });
    return;
  }
  const { id_user, id_product, date, name, count, price, id_category, img, id_brand } = req.body;
  var cartFind = null;
  try {
    cartFind = await cart.findOne({ id_user: id_user });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (cartFind === null) {
    res.status(404).json({ msg: "not found" });
    return;
  }
  cartFind.id_product=id_product;
  cartFind.date=date;
  cartFind.name=name;
  cartFind.count=count;
  cartFind.price=price;
  cartFind.id_category=id_category;
  cartFind.id_brand=id_brand;
  cartFind.img=img;
  cartFind.save((err,docs)=>{
      if(err){
          res.status(500).json({msg:err});
      }
  })
//   let index = cartFind.products.findIndex(
//     element => element._id === product._id
//   );
//   if (index === -1) {
//     res.status(404).json({ msg: "product not found in list" });
//     return;
//   }
//   cartFind.products[index].count = Number(product.count);
//   try {
//     await cart.findByIdAndUpdate(cartFind._id, {
//       $set: { products: cartFind.products }
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//     return;
//   }
  res.status(200).json({ msg: "success" });
}

exports.deleteCart = async (req, res) => {
  if (
    typeof req.body.id_user === "undefined" ||
    typeof req.body.id_product === "undefined"
  ) {
    res.status(422).json({ msg: "invalid data" });
    return;
  }
  const { id_user, id_product } = req.body;
  var cartFind = null;
  try {
    cartFind = await cart.findOne({ id_user: id_user });
  } catch (err) {
    res.status(500).json({ msg: err });
    return;
  }
  if (cartFind === null) {
    res.status(404).json({ msg: "not found" });
    return;
  }
  // let index = cartFind.products.findIndex(
  //   element => element._id === id_product
  // );
  // if (index === -1) {
  //   res.status(404).json({ msg: "product not found in list" });
  //   return;
  // }
  // cartFind.products.splice(index, 1);
  // try {
  //   await cart.findByIdAndUpdate(cartFind._id, {
  //     $set: { products: cartFind.products }
  //   });
  // } catch (err) {
  //   res.status(500).json({ msg: err });
  //   return;
  // }
  res.status(200).json({ msg: "success" });
}

exports.removeCartByIDUser = async (id_user) => {
  try {
    cartFind = await cart.findOne({ id_user: id_user });
  } catch (err) {
    console.log(err)
    return false;
  }
  try {
    await cartFind.remove();
  }
  catch(err) {
    console.log(err);
    return false;
  }
  return true;
}