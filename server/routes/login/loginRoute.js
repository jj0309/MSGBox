const express = require('express');
const router = express.Router();
const loginLib = require('../../DAO/utils/login');


router.get('/',(req,res)=>{
    res.render('../public/login/login.ejs');
})

router.post('/',async(req,res)=>{
    userData = req.body;
    const token = await loginLib.loginValidation(userData);
    if(token)
        res.cookie('MSGBoxCookie',loginLib(token));
    res.render('../public/login/login.ejs');
})

module.exports = router;
