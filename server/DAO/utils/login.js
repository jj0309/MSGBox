const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginValidation=async(userData)=>{
    let token = null
    await user.findOne({username:userData.username},async(error,foundUser)=>{
        if(error) return res.status(404).send(error);
        if(foundUser){
            await bcrypt.compare(userData.password,foundUser.password,(error,res)=>{
                if(error) return res.status(400).send(error);
                if(res){
                    token = {
                        _id:foundUser._id,
                        username:foundUser.username
                    }
                }
            })
        }
    })
};

const jwtSign=(token)=>{
    return jwt.sign(token,process.env.ACCESS_TOKEN_SECRET);
}

exports.loginValidation = loginValidation;