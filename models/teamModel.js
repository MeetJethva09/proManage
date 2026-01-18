const mongoose = require("mongoose")
const teamSchema = new mongoose.Schema({
    teamName : {
        type : String,
        required : true
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'project',
    },
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
    }
} , {timestamps : true} )

module.exports = mongoose.model('team' , teamSchema);