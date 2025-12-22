const jwt = require("jsonwebtoken")

const createJwtToken = (user) =>{
    const payLoad = {
       id : user._id,
       email : user.email,
       mobile : user.mobile,
       username : user.username
    }
    const token = jwt.sign(payLoad , process.env.JWT_SECRET , {
        expiresIn : '10m'
    });

    return token;
}

const createRefreshToken =  (user) =>{
    const refreshpayLoad = {
        _id : user._id,
        email : user.email,
        mobile : user.mobile
    }
    const refreshToken = jwt.sign(refreshpayLoad , process.env.REFRESH_SECRET , {
        expiresIn : '7d'
    });
    return refreshToken;
}

module.exports = {createJwtToken , createRefreshToken}