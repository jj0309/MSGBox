const router = require('express').Router();
const searchUtilsLib = require('../../DAO/utils/searchUtils/searchUtils');
const authLib = require('../../DAO/utils/AuthToken/Token');

router.get('/:username',authLib.authenticateToken,async(req,res)=>{
    renderOBJ={};
    renderOBJ.user = authLib.isLogged(req.user);
    const parsedUsername = req.params.username;
    renderOBJ.user = await searchUtilsLib.findUser(parsedUsername);
    renderOBJ.user.profilePic = await searchUtilsLib.findUserPic(parsedUsername);
    res.render('../public/search/search.ejs',renderOBJ);
})

module.exports = router;