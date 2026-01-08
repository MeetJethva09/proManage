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
    const projects = await projectModel.find({}).populate("createdBy manager")
    res.status(200).json({
        msg : "data fetch",
        data : projects
    })
}

const getManagerProject = async (req ,res) =>{
    try{
        const pro = await projectModel.findOne({manager : req.params.mid}).populate('members')
        res.status(200).json({ msg : "fetch" , data : pro })
    }catch(err) {res.status(500).josn({msg : "internel server error "})}
}

const addMember = async (req, res) =>{
    try{
        const response = await projectModel.findByIdAndUpdate(req.params.pid , {$addToSet : {members : {$each : req.body}}} , {new:true});
        res.status(200).json({msg : "add member" , data : "data add"})
    } catch(err) {res.status(500).json({msg : "internel server err",err})}
}

module.exports = {  addProject , getProjects , getManagerProject , addMember}