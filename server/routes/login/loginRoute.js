const express = require('express');
const router = express.Router();
const loginLib = require('../../DAO/utils/login');
const authLib = require('../../DAO/utils/AuthToken/Token');
const jwt = require('jsonwebtoken');

//TODO:REFRESH TOKENS IN DB LATER
let refreshTokenLS = [];

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
    let refreshToken = null;
    if(token){
        // MAXAGE IS SET TO 24 hours FOR TESTING (NO REFRESH TOKEN IMPLEMENTED YET), TO SET BACKTO 180000 AFTER TESTING
        res.cookie('MSGBoxCookie',loginLib.jwtSign(token));
        refreshToken = loginLib.jwtSignRefresh(token);
        res.cookie('Refresh',refreshToken);
    }
    refreshTokenLS.push(refreshToken);
    console.log(refreshTokenLS);
    res.redirect('/login');
})

router.post('/token/',(req,res)=>{
    const refreshToken = req.cookies.Refresh;
    console.log(req.cookies.MSGBoxCookie);
    if(refreshToken === null || refreshToken === undefined) return res.redirect('/login');
    if(!refreshTokenLS.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(error,user)=>{
        if(error) return res.sendStatus(403);
        const accessToken = loginLib.jwtSign({_id:user._id,username:user.username})
        res.cookie('MSGBoxCookie',accessToken);
    })
})

module.exports = router;
