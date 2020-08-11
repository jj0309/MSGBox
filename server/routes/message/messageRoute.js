const express = require('express');
const router = express.Router();
const authLib = require('../../DAO/utils/AuthToken/Token');

router.get('/',authLib.authenticateToken,(req,res)=>{
    renderOBJ = {};
    renderOBJ.user = authLib.isLogged(req.user);
    res.render('../public/message/message.ejs',renderOBJ);
})

module.exports = router;