const mongoose  = require('mongoose')
const workspaceSchema = new mongoose.Schema({
    workspaceName : {
        type : String,
        required : true,
        unique : true
    },
    workspaceDesc : {
        type : String,
        required : true,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }
} , {timestamps : true})

module.exports = mongoose.model('workspace' , workspaceSchema);