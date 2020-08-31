const router = require('express').Router();
const authLib = require('../../DAO/utils/AuthToken/Token');
const searchUtilLib = require('../../DAO/utils/searchUtils/searchUtils');

router.get('/',authLib.authenticateToken,async(req,res)=>{
    renderOBJ = {};
    const user = authLib.isLogged(req.user);
    renderOBJ.user = await searchUtilLib.findUser(user.username);
    renderOBJ.user.profilePic = await searchUtilLib.findUserPic(user.username);
    res.render('../public/myAccount/myAccount.ejs',renderOBJ);
})

module.exports = router;