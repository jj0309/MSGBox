const router = require('express').Router();
const authLib = require('../../DAO/utils/AuthToken/Token');

router.get('/:username',authLib.authenticateToken,(req,res)=>{
    const isLogged = authLib.isLogged(req.user);
    if(!isLogged)
        res.redirect('../public/login/login.ejs');
    /* 
        TODO: 
        create convo in database, 
        set the invite receiver to the user receiving invite,
        add convoID to both users
    */
})