const workspaceModel = require("../models/workspaceModel")


const addWorkspace = async (req ,res) =>{
    try{
        const addWorkSpace = await workspaceModel.create(req.body);
        res.status(201).json({
            msg : "workspace created",
            data : addWorkSpace
        })
    } catch(err) {
        res.status(500).json({
            msg : "error occured while add workspace",
            data : err
        })
    }
}

const getAllWorkspaces = async (re ,res) =>{
    try{
        const workspaces = await workspaceModel.find({})
        res.status(200).json({
            msg : "workspace fetch",
            data : workspaces
        })
    } catch(err) 
    {
        res.status(500).json({
            msg : "err occured" , err
        })
    }
}

const limitedWorkspace = async (req ,res) =>{
    try{
        const workspace = await workspaceModel.find({}).sort({createdAt : -1}).limit(3);
        res.status(200).json({
            msg : "limited work find",
            data : workspace
        })
    } catch(err) {console.log("Error occured",err)}
}

const getWorkspacebyWid = async (req , res) =>{
    try{
        const workspace = await workspaceModel.findOne({_id : req.params.wid}).populate('users')
        res.status(200).json({ msg : "data fetch" , data : workspace })
    } catch(err) { res.status(500).json({msg:"internel server",err}) }
}

const getWorkspacebyUserId = async (req ,res) =>{
    try{
        const works = await workspaceModel.find({users: req.params.id});
        res.status(200).json({ msg : "fetch" , data : works })
    } catch(err) { res.status(500).json({msg:"internel server error",err}) }
}

module.exports = {addWorkspace,
                 getAllWorkspaces,
                 limitedWorkspace,
                 getWorkspacebyWid,
                 getWorkspacebyUserId
}