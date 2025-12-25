const projectModel = require("../models/projectModel")
const addProject = async(req ,res) =>{
    try{
        const project = await projectModel.create(req.body);
        res.status(201).json({
            msg :"Project added",
            data : project
        })
    } catch(err) {
        res.status(500).json({
            msg : "Error occured",
            data :err
        })
    }
}

const getProjects = async (req , res) =>{
    const projects = await projectModel.find({}).populate("createdBy members")
    res.status(200).json({
        msg : "data fetch",
        data : projects
    })
}

module.exports = {  addProject , getProjects }