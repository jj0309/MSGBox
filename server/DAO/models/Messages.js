const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    convoIndex:{
        type:String, // index that will be stored in both users
        required:false
    },
    activated:{ // receiver must accept convo invite 
        type:Boolean,
        default:false
    },
    inviteReceiver:{ // receiver username
        type:String,
        required:true
    },
    messages:{
        type:Object, 
        /* object is gonna be like this
            {
                {username:'message'},
                {username:'message'},
                {username:'message'},
                {username:'message'},
                {username:'message'},
            }
        */
        required:false
    }
})

MessagesSchema.pre('save',function(next){
    const messages = this;
    messages.convoIndex = messages._id;
    next();
})

const messages = mongoose.model('Messages',MessagesSchema);

module.exports = messages;
