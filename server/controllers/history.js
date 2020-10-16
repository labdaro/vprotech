
const historyModel = require('../models/history')
exports.history = async(req,res)=>{
    const end = new Date();
    end.setHours(end.getHours()+7)
    console.log(end)
    let start = end.toISOString().slice(0,10)
    start = new Date(start)
    console.log(start)
    try{
     const history = await historyModel.find({ date: { $gte: start, $lte: end}}).sort({ date: -1 })
     res.json(history)
    }catch(err){
        
        res.json("error")
    }
}


exports.checkImportExport = async(req,res)=>{
    console.log(req.body)
    const startDate = req.body.startDate
    const end = req.body.endDate 
    const endDate = new Date(end)
    endDate.setHours(endDate.getHours()+23,59)
    
    try{
        const data = await historyModel.find({product_type: req.body.product_type, date: { $gte: startDate, $lte: endDate}}).sort({ date: -1 })
        res.json(data)
    
    }
    catch(err){
        res.status(400).json('error')
    }
}
