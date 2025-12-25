const mongoose = require('mongoose')
const workspaceMemberSchema = new mongoose.Schema({
    workspaceId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'workspace',
        required : true
    },
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }]
},{timestamps : true})

module.exports = mongoose.model('workspaceMember' , workspaceMemberSchema);