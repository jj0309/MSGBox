const messages = require('../../models/Messages');
const userModel = require('../../models/user');

/* 
    VALIDATE IF THE CONVO EXISTS IN THE DB
*/
const roomValidation=async(roomID)=>{
    return new Promise(async(resolve,reject)=>{
        await messages.findOne({convoIndex:roomID},(error,foundConvo)=>{
            if(error) return reject(error);
            if(foundConvo) resolve(true);
            resolve(false);
        })
    })
}

/* 
    CREATE NEW CONVO INTO THE DB
    PARAM1:USER THAT HAS TO ACCEPT THE INVITE
    RETURN:convoID
*/
const createNewConvo=async(receiverUser)=>{
    return new Promise(async(resolve,reject)=>{
        let newMessages = new messages({inviteReceiver:receiverUser,activated:false});
        try{
            await newMessages.save((error)=>{
                if(error) reject(error)
                resolve(newMessages.convoIndex);
            })
        }catch(e){reject(error)}
    })
}

const addConvoIndex=async(convoID,user,receivingUser)=>{
    return new Promise(async(resolve,reject)=>{
        if(convoID === null || convoID === undefined) reject(false);
        resolve(await updateConvoList([user,receivingUser],convoID));
    })
}

const updateConvoList=async(users,convoID)=>{
    return new Promise(async(resolve,reject)=>{
        const bothUsers = users; // to verify userList
        users.forEach(async(user)=> {
            await userModel.findOne({username:user},async(error,foundUser)=>{
                if(error) return reject(error);
                if(foundUser){
                    let newConvo = true;
                    // to check if convo with that user already exists
                    bothUsers.forEach(user => {
                        if(foundUser.userList.includes(user));
                            newConvo = false;
                    });
                    if(newConvo){
                        let updatedUser = foundUser;
                        let newConvosARR = updatedUser.convos;
                        let userListARR = updatedUser.userList;
                        newConvosARR.push(convoID);

                        // to push the username of eachothers into eachothers useList
                        bothUsers.forEach(user => {
                            if(updateUser.username != user)
                                userListARR.push(user);
                        });

                        updatedUser.userList = userListARR;
                        updatedUser.convos = newConvosARR;
                        resolve( await updateUser(foundUser.username,updatedUser));
                    }
                    resolve(false);
                }
            })
        })
    });
}


const updateUser=async(userToUpdate,updatedUser)=>{
    return new Promise(async(resolve,reject)=>{
        await userModel.findOneAndUpdate({username:userToUpdate},updatedUser,(error)=>{
            if(error) reject(error);
            resolve(true);
        });
    })
}

exports.roomValidation = roomValidation;
exports.createNewConvo = createNewConvo;
exports.addConvoIndex = addConvoIndex;