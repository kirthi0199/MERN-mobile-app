const mongoose = require('mongoose');

const productSchema= mongoose.Schema({
//     id:Number,
//     name: String,
//     count: Number,
// })
    name: 
    {type: String,
    required:true,
},
    description:

    {type: String,
        required:true
    },

    richdescription:
    {
        type:String,
        default:''
    },
    image:{
        type:String
    },
    brand:{
        type:String,
        default:''
    },
    price:{
        type: Number,
        default:0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
        
    },
    rating:{
        type:Number,
        default:0,
     },
     numReviews:{
        type:Number,
    default:0,     },

    isFeatured:{
        type:Boolean,
        default:false,
    }
    
    // dateCreated:{
    //     type:Date,
    //     default: Date.now,
    // },
})

 
 exports.Product= mongoose.model('Product', productSchema);
 