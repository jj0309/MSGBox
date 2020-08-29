const router = require('express').Router();
const authLib = require('../../DAO/utils/AuthToken/Token');
const userPannelOpsLib = require('../../DAO/utils/UserPannel/UserPannelOPS');

router.post('/',authLib.authenticateToken,async(req,res)=>{
    const username = authLib.isLogged(req.user).username;
    if(!username)
        res.redirect('/login');
    const newDesc = req.body.newDescription;
    if(req.files)
        await userPannelOpsLib.updateImage(username,req.files.profilePic);
    if(newDesc)
        await userPannelOpsLib.updateDESC(username,newDesc);
    res.redirect('/myaccount');
})

module.exports = router;