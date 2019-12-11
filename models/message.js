const mongoose = require('mongoose')
const messageSchema = mongoose.Schema({
   
    email:{
        type: String,
        required: true,
    },
    
    comments:{
        type: String,
        required: true,
    }
})

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;