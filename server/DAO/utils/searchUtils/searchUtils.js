const user = require('../../models/user');
const UserPic = require('../../models/UserPic');

/* 
    when searching for an user
    param1:username
    return: not found => empty obj || found => user
*/
const findUser=async(parsedUsername)=>{
    return new Promise(async(resolve,reject)=>{
       await user.findOne({username:parsedUsername},(error,foundUser)=>{
            if(error) return reject(error);
            if(foundUser){
                returnOBJ={
                    username:foundUser.username,
                    desc:foundUser.description
                }
                resolve(returnOBJ);
            }
            resolve({});
        })
    })
}

const findUserPic=async(user)=>{
    return new Promise(async(resolve,reject)=>{
        await UserPic.findOne({username:user},(error,foundUser)=>{
            if(error) reject(error);
            if(foundUser) resolve(foundUser.img);
            resolve(null);
        })
    })
}

exports.findUser = findUser;
exports.findUserPic = findUserPic;