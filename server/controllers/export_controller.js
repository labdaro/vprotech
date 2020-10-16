const exportModel = require('../models/export')
const stockCollection = require('../models/stockcollection')
const historyModel = require('../models/history')

exports.all_export = async (req,res) =>{
    try{
            const query =  await exportModel.find().sort({ date: -1 })
            res.json(query)
            
    }catch(error){
        res.status(400).json(error)
    }
}


exports.all_monthly = async(req,res)=>{
    const startDate = req.body.startDate
    // console.log(new Date(startDate))
    const end = req.body.endDate 
    const endDate = new Date(end)
    endDate.setHours(endDate.getHours()+23,59)
    // console.log(endDate)

    
    try{
        const stock = await stockCollection.find({ date: { $gte: startDate, $lte: endDate}}).sort({ date: -1 })
        const exports = await historyModel.find({ date: { $gte: startDate, $lte: endDate}}).sort({ date: -1 })
        console.log(exports)
        let sumExports = 0
        let sumPriceExports = 0 
        let sumImports = 0
        let sumPriceImports = 0 

        let sumStock = 0
        stock.forEach((data)=>{
            sumStock += data.total_amount
        })
        exports.forEach((data)=>{
            if(data.status == 'export'){
                sumPriceExports += data.total_price
                sumExports += data.total_amount
            }else{
                sumPriceImports += data.total_price
                sumImports += data.total_amount
            }
           
        })
        res.json({
            totalStock: sumStock,
            amountExport :sumExports, 
            totalPriceExports:sumPriceExports,
            amountImport: sumImports,
            totalPriceImpors: sumPriceImports,
            all_monthly: exports

        })
    
    }
    catch(err){
        res.status(400).json('error')
    }
}

exports.insert_export = async (req,res)=>{
    console.log(req.body)
    const findProduct = await stockCollection.find({product_type: req.body.product_type}).select('total_amount')
    //inStock amount
    if ( Object.keys(findProduct).length){
    const instockAmount = findProduct[0].total_amount
    console.log(instockAmount)
    //Export Amount
    const exportAmount = instockAmount - req.body.total_amount
    console.log(exportAmount)
    const RemainStock = await stockCollection.updateOne({product_type: req.body.product_type},{ $set: {total_amount: exportAmount }})
    console.log('Update 1 document')
    const total_price = req.body.price_1unit * req.body.total_amount

    const exportResult = new exportModel({
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        total_amount: req.body.total_amount,
        total_price: total_price,
        price_1unit:req.body.price_1unit,
        status: "export",
        date: req.body.date
    })
    const historyResult = new historyModel({
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        total_amount: req.body.total_amount,
        total_price: total_price,
        price_1unit: req.body.price_1unit,
        status: "export",
        date: req.body.date
    })
    try{
        const resultHistory = await historyResult.save()
       const result = await exportResult.save()
       res.status(200).json({stock: RemainStock,export:result})

    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
    }
    else{
        console.log("can't find product in Stock")
        res.status(400).json("can't find Product...")
    }



}