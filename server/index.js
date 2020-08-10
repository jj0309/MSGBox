const express = require('express');
const path = require('path');

const app = express();
const port = 80;
//public path
const publicPath = path.join(__dirname+"/../public/");

// connection to mangoose db
require('./DAO/db/connectionMongoose');

// to parse data from incoming request into json obj
app.use(express.json());

//set public path
app.use('/public',express.static(publicPath));

//to use ejs as our view engine
app.set('view engine','ejs');

//routing
const loginRoute = require('./routes/login/loginRoute');
const registerRoute = require('./routes/register/registerRoute');

app.get('/',(req,res)=>{
    res.render('../public/index.ejs');
});

app.use('/login',loginRoute);
app.use('/register',registerRoute);

app.listen(80,console.log('running on port 80'));