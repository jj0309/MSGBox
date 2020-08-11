const express = require('express');
const router = express.Router();
const loginLib = require('../../DAO/utils/login');
const authLib = require('../../DAO/utils/AuthToken/Token');


router.get('/',authLib.authenticateToken,(req,res)=>{
    renderOBJ = {};
    renderOBJ.user = authLib.isLogged(req.user);

    /* 
        TODO: REFRESH TOKEN AFTER THE ACCESS TOKEN EXPIRES
    */

    res.render('../public/login/login.ejs',renderOBJ);
})

router.post('/',async(req,res)=>{
    userData = req.body;
    const token = await loginLib.loginValidation(userData);
    if(token){
        res.cookie('MSGBoxCookie',loginLib.jwtSign(token),{maxAge:180000});
    }
    res.redirect('/login');
})

module.exports = router;
