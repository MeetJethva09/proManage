const teamModel = require("../models/teamModel")

const creatingTeam = async (req , res) =>{
    try{
        const response = await teamModel.create(req.body);
        res.status(201).json({msg : "team created.." , data : response})
    } catch(err) {res.status(500).json({msg : "server error" , err})}
}

module.exports = {creatingTeam}