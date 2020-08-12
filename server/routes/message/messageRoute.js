const express = require('express');
const router = express.Router();
const authLib = require('../../DAO/utils/AuthToken/Token');

router.get('/',authLib.authenticateToken,(req,res)=>{
    renderOBJ = {};
    renderOBJ.user = authLib.isLogged(req.user);
    res.render('../public/message/message.ejs',renderOBJ);
})

router.get('/:convoID',authLib.authenticateToken,(req,res)=>{
    const io = req.app.get('io');
    renderOBJ = {};
    renderOBJ.user = authLib.isLogged(req.user);
    const usernameIO = renderOBJ.user.username;
    io.on('join',function(room){
        io.join(room);
        console.log('joined');
    })
    io.on('send message',(message)=>{
        io.emit('return message',message);
        /* {surname:usernameIO,sentMSG:message} */
    })

    res.render('../public/message/message.ejs',renderOBJ);
})

module.exports = router;