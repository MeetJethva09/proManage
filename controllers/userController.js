const userModel = require('../models/userModel')
const {createJwtToken , createRefreshToken ,verifyAccessToken} = require("../utils/auth")
const bcrypt = require("bcrypt")
const {createLoginOtp} = require("../utils/loginOtp")

const addUser = async (req ,res) =>{
    try{
        const addedUser = await userModel.create(req.body);
        res.status(201).json({
            msg : 'Signup Success..',
            data : addedUser
        })
    }
    catch(err)
    {
        console.log("Error occured while add user",err);
    }
}

const login = async (req , res) =>{
    try{
        const email = req.body.email;
        const findUser = await userModel.findOne({email});
        if(!findUser) 
            res.status(404).json({ msg : "User Not found.." })
        else 
        {
            const isMatch = await bcrypt.compare(req.body.password , findUser.password);
            if(isMatch === true)
            {
                const authToken = createJwtToken(findUser);              //Create Jwt
                res.cookie('authToken',authToken , {
                    httpOnly : true,
                    secure : false
                });                                                      // set cookies

                const refreshToken = createRefreshToken(findUser);       //Create Refresh
                res.cookie('refreshToken' , refreshToken , { httpOnly : true , secure : false })       //set refresh

                res.status(200).json({
                    msg : `Login Success `,
                    data : findUser,
                })
            }
            else
            {
                res.status(401).json({
                    msg : "Invalid Credentials..."
                })
            }
        }
    }
    catch(err)
    {
        console.log("Error occured while login " ,err)
        res.status(500).json({
            msg : "Internel server Error"
        })
    } 
}

const logoutAction = (req,res) =>{
        res.clearCookie('authToken')
        res.clearCookie("refreshToken");
        res.json({
            msg : "logout.."
        })
}

const userGetById = async (req , res) =>{
    try{
        const getUser = await userModel.findOne({_id : req.params.id});
        res.status(200).json({
            msg : "data fetch",
            data : getUser
        }) 
    }
    catch(err)
    {
        console.log("Eroor occured while get one user",err);
    }
}

const getAllUsers = async (req ,res) =>{
    try{
        const getedUser = await userModel.find();
        res.status(200).json({
            msg : "User fetched..",
            data : getedUser
        })
    }
    catch(err)
    {
        console.log("Error occured while get all user" , err);
    }
}

const updateRole = async (req, res) =>{
    try{
        const updatedRole = await userModel.findByIdAndUpdate(req.params.id, req.body ,{new : true })
        res.status(200).json({
            msg : "role updated.."
        })
    }
    catch(err)
    {
        console.info("Error occured while updaterole" ,err);
    }
}

const getLimitedUser = async (req ,res) =>{
    try{
        const user = await userModel.find().sort({createdAt : -1}).limit(3);   //Pagination
        res.status(200).json({
            msg : "three recent user fetch",
            data : user
        })
    }
    catch(err) { console.log("Error occured while pagination"); }
}

const generateOtp = async (req, res) =>{
    const email = req.body.email;
    const user = await userModel.findOne({email})
    if(!user) res.status(404).json({msg : "User not Found!!"}) 
    
    const loginOtp = Math.floor(Math.random()*1000 + 999);
    await createLoginOtp(user , loginOtp);
    user.loginOtp = loginOtp;
    await user.save();
    res.status(200).json({
        msg : "Otp sent to your Mobile Number..",
        data : user
    });  
}

const loginWithOtp = async (req ,res ) =>{
    const {loginOtp , mobile} = req.body;
    const verifyUser = await userModel.findOne({mobile})
    if(!verifyUser) res.status(404).json({msg : "not found"})
    else
    {
        if(loginOtp != verifyUser.loginOtp)
        {
            res.status(402).json({
                msg: "invalid Otp.."
            })
        }
        else
        {
            res.status(200).json({
                msg : "otp match"
            })
        }
    }
}

module.exports = {addUser , login , userGetById , logoutAction ,getAllUsers , updateRole , getLimitedUser,
                  generateOtp , loginWithOtp
}