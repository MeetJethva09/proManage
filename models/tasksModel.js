const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    taskTitle : {
        type : String,
        required : true
    },
    taskDesc : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        enum : ['Low' , 'High' , 'Medium'],
        required : true
    },
    dueDate : {
        type : Date,
        required : true
    },
    assignedTo : {
        type : mongoose.Schema.ObjectId,
        ref : "users"
    },
    createdBy : {
        type : mongoose.Schema.ObjectId,
        ref : 'users'
    },
    status : {
        type : String,
        enum : ['Pending' , 'Complete'],
        default : "Pending"
    }
}, {timestamps : true })

module.exports = mongoose.model('tasks' , taskSchema); 