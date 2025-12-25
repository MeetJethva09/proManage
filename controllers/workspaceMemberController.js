const workspaceMemberModel = require('../models/workspaceMemberModel')
const addMember = async (req ,res) =>{
    try{
        const addMembers = await workspaceMemberModel.create(req.body);
        res.status(201).json({
            msg : "Members Added..",
            data : addMembers
        })
    } catch(err) {res.status(500).json({msg : "error occured",err})}
}

const getWokspaceById =async (req ,res) =>{
    try{
        const response = await workspaceMemberModel.find();
        res.status(200).json({
            msg : "fetch",
            data:response
        })
    } catch(err) {console.log("error occured",err)}
}

module.exports = {addMember , getWokspaceById}