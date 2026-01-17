const mongoose = require("mongoose")
const teamSchema = new mongoose.Schema({
    teamName : {
        type : String,
        required : true
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'projects',
        required : true
    },
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }
} , {timestamps : true} )

module.exports = mongoose.model('team' , teamSchema);