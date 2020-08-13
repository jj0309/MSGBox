const user = require('../../models/user');
const messages = require('../../models/Messages');

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
                    username:foundUser.username
                }
                resolve(returnOBJ);
            }
            resolve({});
        })
    })
}

exports.findUser = findUser;