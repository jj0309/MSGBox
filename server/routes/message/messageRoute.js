const express = require('express');
const router = express.Router();
const authLib = require('../../DAO/utils/AuthToken/Token');
const roomUtilLib = require('../../DAO/utils/JoinRoomUtils/RoomUtils');

module.exports = function(io){
    router.get('/',authLib.authenticateToken,async(req,res)=>{
        renderOBJ = {};
        renderOBJ.user = authLib.isLogged(req.user);
        if(!renderOBJ.user)
            res.redirect('/login');
        renderOBJ.convoAttempt = false;
        renderOBJ.convoList = await roomUtilLib.retrieveConvosList(renderOBJ.user.username);
        renderOBJ.convoKeys = await roomUtilLib.buildConvoListKeysLS(renderOBJ.convoList);
        res.render('../public/message/message.ejs',renderOBJ);
    })

    router.get('/:convoID',authLib.authenticateToken,async(req,res)=>{
        renderOBJ = {};
        renderOBJ.user = authLib.isLogged(req.user);
        if(!renderOBJ.user)
            res.redirect('/login');
        renderOBJ.convoAttempt = true;
        const usernameIO = renderOBJ.user.username;
        /* always use this roomID as it's from param (impossible to change from the frontend without being verified) */
        const paramRoomID = req.params.convoID;
        renderOBJ.convoList = await roomUtilLib.retrieveConvosList(renderOBJ.user.username);
        renderOBJ.convoKeys = await roomUtilLib.buildConvoListKeysLS(renderOBJ.convoList);
        const convoExist = await roomUtilLib.roomValidation(paramRoomID,renderOBJ.convoKeys);
        if(convoExist){
            io.once('connection',(socket)=>{
                socket.on('subscribe',function(roomID){ // do not use this roomID (changeable from frontend)
                    socket.join(paramRoomID);
                    socket.on('send message',async(message)=>{
                        await roomUtilLib.insertNewMessage(usernameIO,paramRoomID,message);
                        io.to(paramRoomID).emit('return message',{surname:usernameIO,sentMSG:message});
                    })
                })
            })
            renderOBJ.conversation = await roomUtilLib.retrieveConversationMessages(paramRoomID);
        }
        renderOBJ.convoExist = convoExist;
        res.render('../public/message/message.ejs',renderOBJ);
    })
    return router;
}
