const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const imageModel = require('./UserPic');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    surname:{
        type:String,
        required:false,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    convos:{
        type:Array,
        required:false
    },
    userList:{
        type:Array,
        required:false
    },
    description:{
        type:String,
        required:false,
        trim:true,
    }
})

//before it saves into DB
userSchema.pre('save',function(next){
    const user = this;
    const salt = 8;
    //give it his default surname
    user.surname = user.username;

    //hashing of password
    if(!user.isModified('password')){
        return next();
    }
    const newImage = new imageModel({username:user.username})
    newImage.save((error)=>{
        if(error) throw error;
    })
    bcrypt.hash(user.password,salt,(error,hashed)=>{
        if(error){
            return next(error);
        }
        user.password = hashed;
        next();
    })
})

const user = mongoose.model('User',userSchema);

module.exports = user;