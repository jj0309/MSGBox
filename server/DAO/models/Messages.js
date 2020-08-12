const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    convoIndex:{
        type:String,
        required:false
    },
    messages:{
        type:Object,
        required:false
    }
})

MessagesSchema.pre('save',function(next){
    const messages = this;
    messages.convoIndex = messages._id;
    next();
})
