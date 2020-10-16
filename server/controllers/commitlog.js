const commitLog = require('../models/commitlog')
const getcommitlog_all = async(req,res)=>{
    try{
             
        const commitlog = await commitLog.find()
        res.json({data: commitlog})

    }catch(err){
        res.status(400).json({message: err})
    }
}

//insert data into commitlog
const insertcommitlog = async(req,res)=>{
    
    const commitlog_data = new commitLog({
        plate_id: req.body.plate_id,
        organization_name: req.body.organization_name,
        organization_name_khmer: req.body.organization_name_khmer,
        location: req.body.location,
        status: req.body.status,
        type: req.body.type,
        date: req.body.date
        
    })

    try{
        const result_insert = await commitlog_data.save()
        res.status(400).json({msg: 'Insert into commitlog successfully...',
    data: commitlog_data})
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports ={ getcommitlog_all,insertcommitlog}