const twilio = require("twilio")

const account_sid = process.env.ACCOUNT_SID;
const auth_token = process.env.AUTH_TOKEN;

let client = new twilio(account_sid , auth_token);

const createLoginOtp = (user , loginOtp) =>{
   
    try{
        const otp = client.messages.create({
            body : `Your otp for proManage Login, Do not share this to anyone OTP : ${loginOtp}`,
            to : '+91'+user.mobile,
            from : process.env.TWILIO_PHONE
        })
        return otp;
    } catch (err) {res.status(500).json({msg : "error while twilio" ,err})}
}


module.exports = { createLoginOtp }