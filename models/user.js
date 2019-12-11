const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    service:{
        type: Object,
        required: true,
    },
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique:true,
        required: true,
    },
    username:{
        type: String,
        unique:true,
        required: true,
    },
    
    password:{
        type: String,
        required: true,
    },
   
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;