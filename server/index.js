require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);

// connection to mangoose db
require('./DAO/db/connectionMongoose');

// to parse data from incoming request into json obj
app.use(express.json());
// for bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
//to access cookies
app.use(cookieParser());
//for file upload
app.use(upload());

//public path
const publicPath = path.join(__dirname+"/../public/");
//set public path
app.use('/public',express.static(publicPath));
//set image path
const imagePath = path.join(__dirname+"/DAO/")
app.use('/image',express.static(imagePath));

//to use ejs as our view/templating engine
app.set('view engine','ejs');

//routing
const indexRoute = require('./routes/index/indexRoute');
const loginRoute = require('./routes/login/loginRoute');
const registerRoute = require('./routes/register/registerRoute');
const messageRoute = require('./routes/message/messageRoute')(io);
const searchRoute = require('./routes/Search/searchRoute');
const convoRequestRoute = require('./routes/ConvoRequest/convoRequestRoute');
const myAccountRoute = require('./routes/myAccount/myAccountRoute');
//endpoint to edit profile info
const editProfileRoute = require('./routes/myAccount/editProfileInfosRoute');

app.use('/',indexRoute);
app.use('/login',loginRoute);
app.use('/register',registerRoute);
app.use('/messages',messageRoute);
app.use('/search',searchRoute);
app.use('/request',convoRequestRoute);
app.use('/myaccount',myAccountRoute);
app.use('/editProfileInfos',editProfileRoute);



//is up
server.listen(port || 80 ,console.log('running on port 80 '));