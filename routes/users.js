const express= require('express');
const router= express.Router();
const {User}=require('../models/user');
const bcrypt=require('bcryptjs');
 const jwt=require('jsonwebtoken');

router.get(`/`,async (req,res)=>
{
    const userList = await User.find().select ('name phone email');
    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
})
//read data by id

router.get('/:id', async (req,res)=>{
    const user =await User.findById(req.params.id).select ('-passwordHash') ;

    if(!user)
{
    res.status(500).json({message: 'the user with the given id was read'})
}
res.send(user);
})

///create token
router.post('/login', async (req,res)=> {
    const user= await User.findOne({email: req.body.email})
    //const secret=process.env.secret;
    if(!user){
        return res.status(400).send('The user not found');

    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign(
            {
                userId: user.id
            },
            'secret'
           // {expiresIn : '1d'}
        ) 
        res.status(200).send({user: user.email, token: token})
    }
    else{
        res.status(400).send('password is wrong!');
    }
   // return res.status(200).send(user);
})




// router.post('/login', async (req,res)=> {
//     const user= await User.findOne({email: req.body.email})
//     if(!user){
//         return res.status(400).send('The user not found');

//     }
//     else if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
//         res.status(200).send('user Authenticated')
//     }
//     else{
//         res.status(400).send('password is wrong!');
//     }
//    // return res.status(200).send(user);
// })


//create

router.post(`/`, (req, res)=>{
   let user=new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash:bcrypt.hashSync(req.body.password, 10),
      phone:req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    })

   user.save().then((createdUser=>{
        res.status(201).json(createdUser)

    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })
})

module.exports = router;
