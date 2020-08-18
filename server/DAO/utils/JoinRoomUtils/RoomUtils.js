const messages = require('../../models/Messages');
const userModel = require('../../models/user');


/* 
    Library of methods used for messageRoute and convoRequestRoute.
    PS: CTRL+F TO QUICK FIND THE METHODS
    CONTAINS:   -> roomValidation()
                -> createNewConvo()
                -> addConvoIndex()
                -> retrieveConvosList()
                -> buildConvoListKeysLS()
                -> insertNewMessage()
                -> retrieveConversationMessages()

    LAST UPDATED: 18/08/2020 -> added retrieveConversationMessages()
    - KA-SON CHAU
*/

const retrieveConversationMessages=(convoID)=>{
    return new Promise(async(resolve,reject)=>{
        await messages.findById(convoID,(error,foundConvo)=>{
            if(error) reject(error);
            if(foundConvo){
                resolve(foundConvo.messages);
            }
            resolve(null);
        })
    })
}

/* 
    to insert a message into the DB when user sends a message
    param1:username of user that sends the message
    param2: conversation id
    param3:message value in string
*/
const insertNewMessage=(userName,convoID,messageValue)=>{

    const insertIntoDB=async(convoIndex,updatedConvo)=>{
        await messages.findByIdAndUpdate(convoIndex,updatedConvo);
    }

    let convoList = [];
    return new Promise(async(resolve,reject)=>{
        await messages.findById(convoID,(error,foundConvo)=>{
            if(error) reject(error);
            if(foundConvo){
                let messageOBJ = {};
                let updatedConvo = foundConvo;
                messageOBJ[userName] = messageValue;
                convoList = foundConvo.messages;
                convoList.push(messageOBJ);
                updatedConvo.messages = convoList;
                insertIntoDB(convoID,updatedConvo);
            }
            resolve(true);
        });
    })
}


/* 
    to retrieve list of all convos of the user
    param1:username
    return: list of all convos in object form {convoID:nameOfPerson}
*/
const retrieveConvosList=(username)=>{
    return new Promise(async(resolve,reject)=>{
        await userModel.findOne({username:username},async(error,foundUser)=>{
            if(error) return reject(error);
            resolve(await retrieveConvosListName(foundUser.convos,username));
        })
    })
}

/* 
    called in retrieveconvoList
    param1:convoIDList
    param2:username of the user the list belongs to
*/
const retrieveConvosListName=async(convoIDList,username)=>{
    let convoListAndName = {};
    for(let index = 0;index<convoIDList.length;index++){
        convo = convoIDList[index];
        await messages.findById(convo,(error,foundConvo)=>{
            if(error) console.log(error);
            foundConvo.users.forEach(user => {
                if(user != username){
                    const convoIndex = foundConvo.convoIndex;
                    convoListAndName[convoIndex] = user;
                }
            });
        })
    };
    return convoListAndName;
}

/*
    build convo keys for access during rendering
    param1:convoLists object (key:value)
    return list of convo keys
*/
const buildConvoListKeysLS=(convoList)=>{
    let keyList = [];
    for(key in convoList)
        keyList.push(key);
    return keyList;
}

/* 
    VALIDATE IF THE CONVO EXISTS IN THE DB AND IN THE USER CONVOLIST
    param1: roomID
    param2: convolist of user from db
*/
const roomValidation=async(roomID,convoList)=>{
    return new Promise(async(resolve,reject)=>{
        await messages.findOne({convoIndex:roomID},(error,foundConvo)=>{
            if(error) return reject(error);
            if(convoList === undefined) resolve(false);
            if(foundConvo && convoList.includes(roomID)) resolve(true);
            resolve(false);
        })
    })
}

/* 
    CREATE NEW CONVO INTO THE DB
    PARAM1:USER THAT HAS TO ACCEPT THE INVITE
    RETURN:convoID
*/
const createNewConvo=async(users)=>{
    return new Promise(async(resolve,reject)=>{
        let newMessages = new messages({inviteReceiver:users[1],activated:false,users:users});
        try{
            await newMessages.save((error)=>{
                if(error) reject(error)
                resolve(newMessages.convoIndex);
            })
        }catch(e){reject(error)}
    })
}
/* 
    ADDS INDEX INTO CONVOLIST IN THE DB
    PARAM1:CONVOID
    PARAM2:USER
    PARAM3:OTHER USER
*/
const addConvoIndex=async(convoID,user,receivingUser)=>{
    return new Promise(async(resolve,reject)=>{
        if(convoID === null || convoID === undefined) reject(false);
        resolve(await updateConvoList([user,receivingUser],convoID));
    })
}
/* 
    UPDATES CONVOLIST AND USERLIST IN THE DB
    PARAM1:ARRAY OF BOTH USERS
    PARAM2:CONVOID
*/
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
                        if(foundUser.userList.includes(user))
                            newConvo = false;
                    });
                    if(newConvo){
                        let updatedUser = foundUser;
                        let newConvosARR = updatedUser.convos;
                        let userListARR = updatedUser.userList;
                        newConvosARR.push(convoID);

                        // to push the username of eachothers into eachothers useList
                        bothUsers.forEach(user => {
                            if(updatedUser.username != user)
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

/* 
    to update user in the DB
    param1:username
    param2:new user object
*/
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
exports.retrieveConvosList = retrieveConvosList;
exports.buildConvoListKeysLS = buildConvoListKeysLS;
exports.insertNewMessage = insertNewMessage;
exports.retrieveConversationMessages = retrieveConversationMessages;