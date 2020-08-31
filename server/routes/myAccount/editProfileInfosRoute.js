const router = require('express').Router();
const authLib = require('../../DAO/utils/AuthToken/Token');
const userPannelOpsLib = require('../../DAO/utils/UserPannel/UserPannelOPS');

router.post('/',authLib.authenticateToken,async(req,res)=>{
    const username = authLib.isLogged(req.user).username;
    if(!username)
        res.redirect('/login');
    const newDesc = req.body.newDescription;
    const fileData = req.files;
    if(fileData){
        //TODO: save the file into /server/dao/profileImages
        const filePath = '/profileImages/'+username+'.jpg';
        await userPannelOpsLib.updateImage(username,filePath);
        fileData.profilePic.mv('./server/dao/profileImages/'+username+'.jpg',(error)=>{
            if(error) console.log(error);
        })
    }

    if(newDesc)
        await userPannelOpsLib.updateDESC(username,newDesc);
    res.redirect('/myaccount');
})

module.exports = router;