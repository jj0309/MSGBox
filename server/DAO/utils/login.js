const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginValidation=async(userData)=>{
    let token = null
    return new Promise( async(resolve,reject)=>{
        await user.findOne({username:userData.username},async(error,foundUser)=>{
            if(error) return reject(error);
            if(foundUser){
                resolve( await passwordValidation(userData,foundUser));
            }
            resolve(null);
        })
    })
};
const passwordValidation=(userData,foundUser)=>{
    return new Promise(async(resolve,reject)=>{
        await bcrypt.compare(userData.password,foundUser.password,(error,res)=>{
            if(error) reject(error);
            if(res){
                token = {
                    _id:foundUser._id,
                    username:foundUser.username
                }
                resolve(token);
            }
            resolve(null)
        })
    })
}

const jwtSign=(token)=>{
    return jwt.sign(token,process.env.ACCESS_TOKEN_SECRET,{expiresIn:24*60*60+'s'});
}
const jwtSignRefresh=(token)=>{
    return jwt.sign(token,process.env.REFRESH_TOKEN_SECRET);
}

exports.loginValidation = loginValidation;
exports.jwtSign = jwtSign;
exports.jwtSignRefresh = jwtSignRefresh;