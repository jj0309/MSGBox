const router = require('express').Router();
const authLib = require('../../DAO/utils/AuthToken/Token');
const userPannelOpsLib = require('../../DAO/utils/UserPannel/UserPannelOPS');

router.post('/',authLib.authenticateToken,async(req,res)=>{
    const username = authLib.isLogged(req.user).username;
    if(!username)
        res.redirect('/login');
    const newData = req.body;
    if(req.files)
        await userPannelOpsLib.updateImage(username,req.files.profilePic);
    res.redirect('/myaccount');
})

module.exports = router;