const express = require('express');
const user = require('../../DAO/models/user');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('../public/register/register.ejs');
})

router.post('/',async(req,res)=>{
    newUser = new user(req.body);

    /* 
        TODO: VERIFY IF ANY EMPTY FIELDS
    */

    //save user into db
    renderOBJ={success:true};
    try{
        await newUser.save((error)=>{
            if(error){
                renderOBJ.success = false;
            }
        })
        res.render('../public/register/register.ejs',renderOBJ);
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;