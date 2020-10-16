// DB=mongodb+srv://vprotech:vprotech@0987@cluster0.a30aa.mongodb.net/vprotechIES?retryWrites=true&w=majority
// DB=mongodb://localhost/IE_Product
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
 
const commitlog = require('./routes/commitlog')
const weekly = require('./routes/weekly')
const collectionRoute = require('./routes/collection')
const historyRoute = require('./routes/history')
const userRoutes = require('./routes/user')
const initUser = require('./controllers/initUser')
const userModel = require("./models/user");

//IE Product 
const importRoute = require('./routes/importRoute')
const exportRoute = require('./routes/exportRoute')
const monthlyRoute = require('./routes/stockCollectionRoute')
const startServer = async () => {
    const app = express()

    mongoose.connect(process.env.DB,
        { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true});
    const db= mongoose.connection
    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log('Connected to Database'))

    await initUser(userModel);
    app.use(cors());
    app.use(express.json())
    app.use('/collection', collectionRoute)
    app.use('/api/weekly', weekly)
    app.use('/api/history', historyRoute)
    app.use('/api/user', userRoutes)
    app.use('/api/commitlog',commitlog)
    app.use('/api/imports',importRoute)
    app.use('/api/exports',exportRoute)
    app.use('/api/monthly',monthlyRoute)
    if (process.env.NODE_ENV === 'production') {
        // Static folder
        app.use(express.static(__dirname + '/public/'));
      
        // Handle SPA
        app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
      }

    app.listen(3000, () => console.log('Server Started'))
}
startServer() 