const mongoose = require("mongoose")
const projectSchema = new mongoose.Schema({
    projectName : {
        type : String,
        required : true
    },
    projectDesc : {
        type : String,
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    workspaceId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "workspaces"
    },
    manager : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "users"
    }, 
    deadline : {
        type : Date,
        required : true
    },
    members : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users",
            default : null
        }
    ]
}, {timestamps : true})

module.exports = mongoose.model("project" , projectSchema);