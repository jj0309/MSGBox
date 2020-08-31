const mongoose = require('mongoose');

const userPicSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    img:{
        type:String,
        default:'/profileImages/default.jpg'
    }
})

const imageData = mongoose.model('Image',userPicSchema);

module.exports = imageData;