const taskModel = require("../models/tasksModel")

const addTask = async (req , res )=>{
    try{
        const addedTask = await taskModel.create(req.body);
        res.status(201).json({
            msg : "Task Assigned..",
            data : addedTask
        })
    }
    catch(err)
    {
        console.log("Error occured while addedtask" ,err);
    }
}

const getTaskByUsers = async (req , res) =>{
    try{
        const getTasks = await taskModel.find({assignedTo : req.params.id}).sort({createdAt:-1}).limit(3);
        res.status(200).json({
            msg : "task fetch..",
            data : getTasks
        })
    }
    catch(err) {console.log("Error occured while getTask" , err);}
}

const getTaskByTaskId =async (req ,res) =>{
    try{
        const tasks = await taskModel.findOne({_id : req.params.id}).populate("createdBy")
        res.status(200).json({
            msg : "task fetch",
            data : tasks
        })
    }
    catch(err) {console.log("Error occured while task fetch.",err);}
}

const updateTaskByUser = async (req ,res) =>{
    try{
        const updatedTask = await taskModel.findByIdAndUpdate(req.params.id , req.body , {new : true});
        res.status(200).json({
            msg : "task status updated",
        })
    }
    catch(err) {console.log("Error occured while update task");}
}

const getAllTasks = async (req ,res) =>{
    try{
        const allTasks = await taskModel.find({}).populate('assignedTo createdBy')
        res.status(200).json({
            msg :"task fetched..",
            data: allTasks
        })
    }
    catch(err)
    {
        res.json({data : "error occured..",err})
    }
}


module.exports = {addTask , getTaskByUsers,
    getTaskByTaskId,
    updateTaskByUser,
    getAllTasks

}  