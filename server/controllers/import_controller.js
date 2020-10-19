const importModel = require('../models/import')
const stockCollection = require('../models/stockcollection')
const historyModel = require('../models/history')
exports.all_import = async(req,res) =>{
    try{
        console.log(req.body)
        const importResult = await importModel.find().sort({date:-1})
        res.json(importResult)

    }catch(errr){
        res.status(400).json(err)
    }
}


exports.insert_import = async (req,res)=>{
    console.log(typeof req.body.price_1unit)
   const checkExisting = await stockCollection.find({product_type: req.body.product_type})
    if(Object.keys(checkExisting).length){
        let oldAmount = checkExisting[0].total_amount
        let newAmount = req.body.total_amount
        let addNew = parseInt(newAmount) + oldAmount
        const RemainStock = await stockCollection.updateOne({product_type: req.body.product_type},{ $set: {total_amount: addNew,price_1unit:req.body.price_1unit }})
        var date = new Date()
        var options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        };
        var timeString = date.toLocaleString('th-TH',options);
        const total_price = req.body.price_1unit * req.body.total_amount
 
        const importResult = new importModel({
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        total_amount: req.body.total_amount,
        total_price: total_price,
        price_1unit: req.body.price_1unit,
        status: "import",
        time: timeString,
        date: req.body.date
    })

    const stockResult = new stockCollection({
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        total_amount: req.body.total_amount,
        status: "instock",
        price_1unit: req.body.price_1unit,
        date: req.body.date
    })

    const histroyResult = new historyModel({
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        total_amount: req.body.total_amount,
        total_price: total_price,
        price_1unit: req.body.price_1unit,
        status: "import",
        time: timeString,
        date: req.body.date
        
    })
    try{
        const history = await histroyResult.save()
       const imports = await importResult.save()
       res.status(200).json({import: imports,history:history})

    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
    }else{
        var date = new Date()
        var options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        };
        var timeString = date.toLocaleString('th-TH',options);
    const total_price = req.body.price_1unit * req.body.total_amount
    console.log(total_price)
    console.log(typeof total_price)
    const importResult = new importModel({
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        total_amount: req.body.total_amount,
        total_price: total_price,
        price_1unit: req.body.price_1unit,
        status: "import",
        time: timeString,
        date: req.body.date
    })
    const stockResult = new stockCollection({
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        total_amount: req.body.total_amount,
        status: "instock",
        price_1unit: req.body.price_1unit,
        date: req.body.date
    })
    const histroyResult = new historyModel({
        product_id: req.body.product_id,
        product_type: req.body.product_type,
        total_amount: req.body.total_amount,
        total_price: total_price,
        price_1unit: req.body.price_1unit,
        status: "import",
        time: timeString,
        date: req.body.date
        
    })
    try{
        const history = await histroyResult.save()
        const stocks = await stockResult.save()
       const imports = await importResult.save()
       res.status(200).json({import: imports,stock: stocks,history:history})

    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
   
    }
}