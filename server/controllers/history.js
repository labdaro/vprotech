
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