const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.info('Database Connectivity Success..')
})
.catch((err)=>{
    console.log("Error occured while connecting DB" , err);
})

module.exports = mongoose.connection;