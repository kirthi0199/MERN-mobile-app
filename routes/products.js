const express= require('express');
const router= express.Router();
const {Product}=require('../models/product');

router.get(`/`,async (req,res)=>
{
    const productList= await Product.find();
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
})


//POST
router.post(`/`, (req, res)=>{
    const product=new Product({
        id: req.body.id,
        name: req.body.name,
       count: req.body.count
    })

    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)

    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
   
})
module.exports=router;
