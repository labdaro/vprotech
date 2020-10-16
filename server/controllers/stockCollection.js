const stockcollection = require('../models/stockcollection')
const importModel = require('../models/import')
const exportModel = require('../models/export')
const historyModel = require('../models/history')

exports.all_stock = async(req,res)=>{
    try{
        const stock = await stockcollection.find()
        res.json(stock)
    }catch(err){
        res.json(err)
    }
} 
exports.checkOne = async(req,res)=>{
    try{
        const stock = await stockcollection.find({product_type: req.body.product_type})
        res.json(stock)
    }catch(err){
        res.json(err)
    }
} 

exports.all_monthly = async(req,res)=>{
    const startDate = req.body.startDate
    const end = req.body.endDate 
    const endDate = new Date(end)
    endDate.setHours(endDate.getHours()+23,59)
    // console.log(endDate)

    
    try{
        const stock = await stockcollection.find({ date: { $gte: startDate, $lte: endDate}}).sort({ date: -1 })
        const exports = await historyModel.find({ date: { $gte: startDate, $lte: endDate}}).sort({ date: -1 })
        console.log(exports)
        let sumImports = 0
        let sumImportPrice =0
        let sumExports = 0
        let sumPriceExports = 0 
        let sumStock = 0
        let sumStockPrice = 0 
        stock.forEach((data)=>{
            sumStock += data.total_amount
            sumStockPrice += data.price_1unit * data.total_amount
        })

        exports.forEach((data)=>{
            if(data.status == 'import'){
                sumImportPrice += data.total_price
                sumImports += data.total_amount
            }
           
        })
        exports.forEach((data)=>{
            if(data.status == 'export'){
                sumPriceExports += data.total_price
                sumExports += data.total_amount
            }
           
        })
        res.json({
            sumStockPrice: sumStockPrice,
            totalStock: sumStock,
            sumImports,
            sumImportPrice,
            amountExport :sumExports, 
            totalPriceExports:sumPriceExports,
            all_monthly: exports

        })
    
    }
    catch(err){
        res.status(400).json('error')
    }
}

exports.history = async(req,res)=>{
    const end = new Date();
    end.setHours(end.getHours()+7)
    console.log(end)
    let start = end.toISOString().slice(0,10)
    start = new Date(start)
    console.log(start)
    try{
     const history = await importModel.find({ date: { $gte: start, $lte: end}}).sort({ date: -1 })
     res.json(history)
    }catch(err){
        
        res.json("error")
    }
}


