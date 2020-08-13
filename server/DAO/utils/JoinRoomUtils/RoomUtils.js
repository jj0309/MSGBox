const messages = require('../../models/Messages');

const roomValidation=async(roomID)=>{
    return new Promise(async(resolve,reject)=>{
        await messages.findOne({convoIndex:roomID},(error,foundConvo)=>{
            if(error) return reject(error);
            if(foundConvo) resolve(true);
            resolve(false);
        })
    })
}

exports.roomValidation = roomValidation;