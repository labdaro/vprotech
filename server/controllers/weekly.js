const collections = require('../models/Collection')
require('dotenv').config()
const line = require('@line/bot-sdk');





//User choose the date
const range_day = async(req,res)=>{
    var now = new Date();
    now.setHours( now.getHours() + 7 );
    console.log(now)

    const day7 = new Date()
    day7.setDate(day7.getDate() - 7)
    day7.setHours(day7.getHours()+7)
    console.log(day7)

    try{
        const test_day = await collections.find({ Date: { $gte: day7, $lte: now}}).sort({ date: 1 })
        res.json({mgs: "Successfully.....", count:  Object.keys(test_day).length,date: test_day})
    }
    catch(err){
        res.status(400).json(err)
    }
    // try{
    //     const test_day = await collections.find({ Date: { $gte: req.body.startDate, $lte: req.body.endDate}}).sort({ date: 1 })
    //     res.json({mgs: "Successfully.....", count:  Object.keys(test_day).length,date: test_day})
    // }
    // catch(err){
    //     res.status(400).json(err)
    // }
}


 // by default last 7 days ( weekly_plate)
const all_weekly = async(req,res)=>{
    // console.log(req.body.endDate)
    // console.log(new Date(req.body.startDate))
    if (Object.keys(req.body).length === 0){

            var now = new Date();
            now.setHours( now.getHours() + 7 );
            console.log(now)

            
            const day7 = new Date();
            day7.setDate(day7.getDate() - 7)
            const last_7day = day7.toISOString().slice(0,10)
            console.log(new Date(last_7day))

            try{
                const test_day = await collections.find({ Date: { $gte: last_7day, $lte: now}}).sort({ date: 1 })
                res.json({mgs: "Last 7 Dates.....", count:  Object.keys(test_day).length,date: test_day})
            }
            catch(err){
                res.status(400).json(err)
            }
           

    }
    else{
        const startDate = req.body.startDate
        console.log(startDate)
        const end = req.body.endDate
        const endDate = new Date(end)
        endDate.setHours(endDate.getHours()+23,59)
        console.log(endDate)
        
        try{
            const test_day = await collections.find({ Date: { $gte: startDate, $lte: endDate}}).sort({ date: 1 })
            res.json({mgs: "Specific Date.....", count:  Object.keys(test_day).length,date: test_day})
        }
        catch(err){
            res.status(400).json(err)
        }
    }
}

const out_plate = async(req,res)=>{
    try{
        const count_out = await commitlog.find({date: { $gte: req.body.current_date, $lte: req.body.user_choose },status: 'out'})
        res.json({ count:  Object.keys(count_out).length, data: count_out})
}catch(err){
    res.status(400).json(err)
}
} 
const in_plate = async(req,res)=>{
    try{
        const count_in = await commitlog.find({date: { $gte: req.body.current_date, $lte: req.body.user_choose },status: 'in'})
        res.json({count:  Object.keys(count_in).length, data: count_in})
}catch(err){
    res.status(400).json(err)
}
} 


module.exports = {all_weekly,out_plate,in_plate,range_day}