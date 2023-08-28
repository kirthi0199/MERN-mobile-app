const mongoose = require('mongoose');

const categorySchema= mongoose.Schema({
    id:Number,
    name: String,
    count: Number,
})
//     name:
//     {type: String,
//     required:true,
// },
// icon:{
//     type:String,
// },

// color:
// {
//     type:String,                                      
// }                          
// })
   
 exports.Category= mongoose.model('Category', categorySchema);