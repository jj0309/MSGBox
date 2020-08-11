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
        // MAXAGE IS SET TO 24 hours FOR TESTING (NO REFRESH TOKEN IMPLEMENTED YET), TO SET BACKTO 180000 AFTER TESTING
        res.cookie('MSGBoxCookie',loginLib.jwtSign(token),{maxAge:24 * 60 * 60 * 1000});
    }
    res.redirect('/login');
})

module.exports = router;
