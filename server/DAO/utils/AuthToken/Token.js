const jwt = require('jsonwebtoken');
require('express');

const authenticateToken=(req,res,next)=>{
    if(req.cookies.MSGBoxCookie){
        const token = req.cookies.MSGBoxCookie;
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(400).send(err);
            req.user = user;
        })
    }
    return next();
}

const isLogged=(user)=>{
    if(user)
        return user;
    else
        return false;
}

exports.isLogged = isLogged;
exports.authenticateToken = authenticateToken;