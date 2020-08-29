const imageModel = require('../../models/UserPic');
const userModel = require('../../models/user');

/* 
    Library for user pannel transaction with the database.
    ->updateImage(userToUpdate,image)

    last updated: 28/08/2020
    - Ka-son Chau
*/

const updateImage=async(userToUpdate,image)=>{
    return new Promise(async(resolve,reject)=>{
        await imageModel.findOneAndUpdate({username:userToUpdate},{img:image},(error,foundUser)=>{
            if(error) reject(error);
            if(foundUser)
                resolve(true);
            resolve(false);
        })
    })
}

const updateDESC=async(userToUpdate,newDesc)=>{
    return new Promise(async(resolve,reject)=>{
        await userModel.findOneAndUpdate({username:userToUpdate},{description:newDesc},(error,foundUser)=>{
            if(error) reject(error);
            if(foundUser)
                resolve(true);
            resolve(false);
        })
    })
}

exports.updateImage = updateImage;
exports.updateDESC = updateDESC;