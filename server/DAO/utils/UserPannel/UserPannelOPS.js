const imageModel = require('../../models/UserPic');

/* 
    Library for user pannel transaction with the database.
    ->updateImage(userToUpdate,image)

    last updated: 28/08/2020
    - Ka-son Chau
*/

const updateImage=(userToUpdate,image)=>{
    return new Promise(async(resolve,reject)=>{
        await imageModel.findOneAndUpdate({username:userToUpdate},{img:image},(error,foundUser)=>{
            if(error) reject(error);
            if(foundUser)
                resolve(true);
            resolve(false);
        })
    })
}

exports.updateImage = updateImage;