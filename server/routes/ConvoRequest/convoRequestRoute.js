const router = require('express').Router();
const authLib = require('../../DAO/utils/AuthToken/Token');
const roomUtilsLib = require('../../DAO/utils/JoinRoomUtils/RoomUtils');

router.get('/:username',authLib.authenticateToken,async(req,res)=>{
    const isLogged = authLib.isLogged(req.user);
    if(!isLogged)
        return res.redirect('/login');
    const user = req.user.username;
    const sentUser = req.params.username;
    const users = [user,sentUser];
    /* 
        TODO:IF CONVO ALREADY EXISTS BETWEEN USERS, DO NOT CREATE NEW CONVO
    */
    const convoID = await roomUtilsLib.createNewConvo(users);
    await roomUtilsLib.addConvoIndex(convoID,user,sentUser);
    res.redirect('/messages');
})

module.exports = router;