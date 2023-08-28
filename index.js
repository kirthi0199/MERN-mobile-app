const express=require('express');
const index = express();
const morgan =require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api =process.env.API_URL;
const cors=require ('cors');
index.use(cors());
index.options('*', cors());
//middleware library
 index.use(express.json());
 index.use(morgan('tiny'));

 //routers


 const productsRoutes=require('./routes/products');
 const categoriesRoutes= require('./routes/categories');
 const usersRoutes = require('./routes/users');
 const ordersRoutes = require('./routes/orders');


 //



//  

 index.use(`${api}/products`,productsRoutes)

  index.use(`${api}/users`,usersRoutes)
 index.use(`${api}/orders`,ordersRoutes)
index.use(`${api}/categories`,categoriesRoutes)


 
 const uri= process.env.CONNECTION_STRING;


 mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbname: 'kirthiproducts'})

 .then(()=> {
    console.log('Database Connection is ready..')
 })

 index.listen(3000, ()=>{
    console.log(api);

console.log('server is running http://localhost:3000'); 
})


//  const productSchema= mongoose.Schema({
//     name: String,
//     countInStock: Number,
//  })
//  const Product= mongoose.model('product', productSchema)
 


// //ENV URL

// index.use(express.json());

// //console.log(uri);
// // GET
// // index.get(`${api}/products`, (req, res) =>{
// //     const product={
// //         id: 2,
// //         name: "jjjjjj",
// //     }
// //     res.send(product);
// //     console.log(product)
// // })

// const Product= require('./models/product');
// //read
// index.get(`${api}/products`,async(req,res)=>
// {
//     const productList= await Product.find();
//     res.send(productList);
// })


// //POST
// index.post(`${api}/products`, (req, res)=>{
//     const product=new Product({
//         name: req.body.name,
//         countInStock: req.body.countInStock
//     })

//     product.save().then((createdProduct=>{
//         res.status(201).json(createdProduct)

//     })).catch((err)=>{
//         res.status(500).json({
//             error:err,
//             success:false
//         })
//     })
   
// })



// // //mongodb
// const uri =process.env.CONNECTION_STRING;
// )
// //  .catch((err)=>{
// //     console.log(err);
// //  }) 
// //LOCALHOST


// //mongodb+srv://kirthi:<password>@cluster0.qok0pm0.mongodb.net/?retryWrites=true&w=majority




