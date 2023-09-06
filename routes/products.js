const express= require('express');
const router= express.Router();
const {Product}=require('../models/product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');


router.get(`/`,async (req,res)=>
{
    let filter ={};
    if(req.query.categories)
    {
        filter = {category: req.query.categories.split(',')}
    }
    const productList= await Product.find( filter).populate('category');
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
})

//read the data

// router.get(`/`,async (req,res)=>
// {
//     const productList= await Product.find();
//     if(!productList){
//         res.status(500).json({success:false})
//     }
//     res.send(productList);
// })

// // read data by id

router.get('/:id', async (req,res)=>{
    const product =await Product.findById(req.params.id).populate('category');

    if(!product)
{
    res.status(500).json({message: 'the category with the given id was read'})
}
res.send(product);
})


//POST
router.post('/', async (req,res)=> {
    const category =await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Catgory')

 let  product = new Product({

name: req.body.name,
description: req.body.description,
richdescription: req.body.richdescription,
image: req.body.image,
brand: req.body.brand,
price: req.body.price,
category: req.body.category,
countInStock: req.body.countInStock,
rating: req.body.rating,
numReviews: req.body.numReviews,
isFeatured: req.body.isFeatured,
})

 product = await product.save();

if(!product)
return res.status(500).send('The product cannot be created')
res.send(product);

})

     //update
     router.put('/:id', async (req,res)=> {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richdescription: req.body.richdescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,

            }).then(product => {
                if(product){
                    return res.status(200).json({success:true, message:'the product is update'})
                }
                else{
                    return res.status(404).json({success:false, message: "product is not update"})
                }
            }).catch(err=>{
                return res.status(400).json({success:false, error: err})
            })

    //delete
router.delete('/:id', (req,res)=>{
   Product.findByIdAndRemove(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({success: true, message:'the product is deleted'})
        }
        else{
            return res.status(404).json({success: false, message: "product is not removed"})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error: err})
    })
})

//count

router.get('/get/count', async (req,res)=>
{
    const productCount = await Product.countDocuments((count)=> count)
    if(!productCount){
        res.status(500).json({success:false})    
    }
    res.send ({productcount:productCount});
})

//featured count


// router.get('/get/featured/:count', async (req,res)=>{
//     const count =req.params.count ? req.params.count:0
//     const products = await Product.find({isFeatured: true}).limit(count);
//     if(!products){
//         res.status(500).json({success: false})

//     }
//     res.send(products);
// })

     })

   


module.exports=router;
