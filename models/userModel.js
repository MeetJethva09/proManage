const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        enum : ['Member' , 'Owner' , 'Manager'],
        default : 'Member'
    }
}, {timestamps: true})

userSchema.pre("save" , async function(){
    const user = this;
    if(!user.isModified("password")) return;

        const hashPassword = await bcrypt.hash(user.password , 10);
        user.password = hashPassword;    
})

module.exports = mongoose.model('users' , userSchema);   