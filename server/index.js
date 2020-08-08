const express = require('express');
const path = require('path');

const app = express();
const port = 80;
const publicPath = path.join(__dirname+"/../public/");

app.use('/public',express.static(publicPath));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('../public/index.ejs');
})

app.listen(80,console.log('running on port 80'));