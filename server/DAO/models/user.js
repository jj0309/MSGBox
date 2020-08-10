const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    }
})

userSchema.pre('save',function(next){
    const user = this;
    const salt = 8;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.hash(user.password,salt,(error,hashed)=>{
        if(error)
            return next(error);
        user.password = hashed;
        next();
    })
})

const user = mongoose.model('User',userSchema);

module.exports = user;