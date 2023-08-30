const express= require('express');
const router= express.Router();
const {Category} =require('../models/category');
 //read data
router.get(`/`, async (req,res)=>
{
    const categoriesList = await Category.find();
    if(!categoriesList){
        res.status(500).json({success:false})
    }
    res.send(categoriesList);
})
// read data by id

router.get('/:id', async (req,res)=>{
    const category =await Category.findById(req.params.id);

    if(!category)
{
    res.status(500).json({message: 'the category with the given id was read'})
}
res.status(200).send(category);
})


//create
router.post('/', async (req, res)=>{
   let category=new Category({
        id: req.body.id,
        name: req.body.name,
       count: req.body.count
    })
    category= await category.save();
    if(!category)
    return res.status(404).send('the category cannot be created')
    
  res.send(category);
})


//update
router.put('/:id', async (req,res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
         id: req.body.id,
         name: req.body.name,
         count: req.body.count
        }).then(category => {
            if(category){
                return res.status(200).json({success: true, message:'the category is update'})
            }
            else{
                return res.status(404).json({success: false, message: "category is not update"})
            }
        }).catch(err=>{
            return res.status(400).json({success:false, error: err})
        })
        

//delete

router.delete('/:id', (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category=>{
        if(category){
            return res.status(200).json({success: true, message:'the category is deleted'})
        }
        else{
            return res.status(404).json({success: false, message: "category is not removed"})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error: err})
    })
})

    // category.save().then((createdCategory=>{
    //     res.status(201).json(createdCategory)

    // })).catch((err)=>{
    //     res.status(500).json({
    //         error:err,
    //         success:false
    //     })

// router.post('/', async (req,res)=>{
//     let category=new Category({
//         id: req.body.id,
//         name: req.body.name,
//         count:req.body.count
//     })
//     category =await category.save();

//     if(!category)
//     return res.status(404).send('the category cannot be created!')
//     res.send(category);
//     })
})
module.exports=router;