const Collection = require('../models/Collection')

exports.all_student = async (req, res) => {
    try{
        const plates = await Collection.find()
        res.json(plates)
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

//insert the student information
exports.insert_student = async (req, res) => {
    const attendance = new Collection({
        student_id: req.body.student_id,
        name: req.body.name,
        batch: req.body.batch,
        major: req.body.major,
        session: req.body.session,
        Date: req.body.Date,
        status: req.body.status,     
    })
    try {
        const newAttendance = await attendance.save()
        res.status(201).json(newAttendance)
    } catch (err){
        res.status(400).json({message: err.message})
    }
}

