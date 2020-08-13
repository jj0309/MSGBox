const express = require('express');
const router = express.Router();
const authLib = require('../../DAO/utils/AuthToken/Token');
const roomUtilLib = require('../../DAO/utils/JoinRoomUtils/RoomUtils');
module.exports = function(io){
    router.get('/',authLib.authenticateToken,(req,res)=>{
        renderOBJ = {};
        renderOBJ.user = authLib.isLogged(req.user);
        renderOBJ.convoAttempt = false;
        res.render('../public/message/message.ejs',renderOBJ);
    })

    router.get('/:convoID',authLib.authenticateToken,async(req,res)=>{
        renderOBJ = {};
        renderOBJ.user = authLib.isLogged(req.user);
        renderOBJ.convoAttempt = true;
        const usernameIO = renderOBJ.user.username;
        /* always use this roomID as it's from param (impossible to change from the frontend without being verified) */
        const paramRoomID = req.params.convoID; 
        const convoExist = await roomUtilLib.roomValidation(paramRoomID);
        if(convoExist){
            io.once('connection',(socket)=>{
                console.log('connected');
                socket.on('subscribe',function(roomID){ // do not use this roomID (changeable from frontend)
                    socket.join(paramRoomID);
                })
                socket.on('send message',(message)=>{
                    io.emit('return message',{surname:usernameIO,sentMSG:message});
                })
            })
        }
        renderOBJ.convoExist = convoExist;
        res.render('../public/message/message.ejs',renderOBJ);
    })
    return router;
}
