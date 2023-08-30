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

// // read data by id

// router.get('/:id', async (req,res)=>{
//     const product =await Product.findById(req.params.id);

//     if(!product)
// {
//     res.status(500).json({message: 'the category with the given id was read'})
// }
// res.status(200).send(product);
// })


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
    
     //update
     router.put('/:id', async (req,res)=> {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
             id: req.body.id,
             name: req.body.name,
             count: req.body.count
            }).then(product => {
                if(product){
                    return res.status(200).json({success: true, message:'the product is update'})
                }
                else{
                    return res.status(404).json({success: false, message: "product is not update"})
                }
            }).catch(err=>{
                return res.status(400).json({success:false, error: err})
            })

    
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
   
})
})
module.exports=router;
