const jwt = require('jsonwebtoken')

const verifyToken = (req ,res ,next) =>{
    const token = req.cookies.authToken;
    if(!token) return res.status(404).json({msg : "Token not found !!"})
    try{
        const decode = jwt.verify(token , process.env.JWT_SECRET)
        next()
    } catch(err)
    {
        res.status(403).json({ msg : "Token Expires.." })
    }
    
}

const permissionsManager = (req,res,next) =>{
    const token = req.cookies.authToken;
    if(!token) return res.status(403).json({msg:"not not found!!"})
        try{
            const tokenDecoded = jwt.verify(token , process.env.JWT_SECRET);
            const role = tokenDecoded.role;
    }
    catch(err) {res.status(500).json({msg:"internel sever error",err})}
}

module.exports = {verifyToken,permissionsManager} 