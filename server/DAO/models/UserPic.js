const mongoose = require('mongoose');

const userPicSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    img:{
        data:Buffer,
        contentType:String
    }
})

const imageData = mongoose.model('Image',userPicSchema);

module.exports = imageData;