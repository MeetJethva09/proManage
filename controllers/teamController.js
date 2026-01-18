const teamModel = require("../models/teamModel")

const creatingTeam = async (req , res) =>{
    try{
        const response = await teamModel.create(req.body);
        res.status(201).json({msg : "team created.." , data : response})
    } catch(err) {res.status(500).json({msg : "server error" , err})}
}

const getTeamsByManagerId = async (req,res) =>{
    try{
        const response = await teamModel.find({createdBy : req.params.mid}).populate("project members")
        res.status(200).json({msg : "team fetch" , data : response})
    } catch(err) {res.status(500).json({msg : "server error",err})}
}

module.exports = {creatingTeam , getTeamsByManagerId}