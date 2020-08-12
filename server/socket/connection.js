/* 
    LEGACY FILE: NO LONGER USED
    ~ KA-SON CHAU
*/
const user = require('../DAO/models/user');
const messages = require('../DAO/models/Messages');
const socketio = require('socket.io');


/* 
    new connection
    param1:convoID
    param2:server
    param3: username to associate socket id to
*/
const Connection = function(convoID,server,username){
    const io = socketio(server);
    const usernameIO = username;
    io.on('subscribe',(socket)=>{
        io.join(convoID);
        socket.on('chat message',(message)=>{
            io.emit('chat message',{surname:usernameIO,sentMSG:message});
        })
    })
}

exports.Connection = Connection;