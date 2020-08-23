const router = require('express').Router();
const authLib = require('../../DAO/utils/AuthToken/Token');

router.get('/',authLib.authenticateToken,(req,res)=>{
    renderOBJ = {};
    renderOBJ.user = authLib.isLogged(req.user);
    res.render('../public/myAccount/myAccount.ejs',renderOBJ);
})

module.exports = router;