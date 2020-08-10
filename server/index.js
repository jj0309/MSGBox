const express = require('express');
const path = require('path');

const app = express();
const port = 80;
const publicPath = path.join(__dirname+"/../public/");

app.use(express.json());
app.use('/public',express.static(publicPath));
app.set('view engine','ejs');

const loginRoute = require('./routes/login/loginRoute');
const registerRoute = require('./routes/register/registerRoute');

app.get('/',(req,res)=>{
    res.render('../public/index.ejs');
});

app.use('/login',loginRoute);
app.use('/register',registerRoute);

app.listen(80,console.log('running on port 80'));