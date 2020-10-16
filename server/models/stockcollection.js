const mongoose = require('mongoose')
const StockCollection = new mongoose.Schema({
    product_id:{
        type:Number,
        required: true
    },

    product_type:{
        type:String,
        required:true
    },
    total_amount:{
        type:Number,
        required:true
    },
    price_1unit:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:Date
    }

})


module.exports = mongoose.model('StockCollection',StockCollection)