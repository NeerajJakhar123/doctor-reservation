const mongoose = require('mongoose');


// User Schema Or Document Structure
const msgSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true
    },
    date:{
        type: Date,
        default: Date.now
    }
})


// Create Model
const Message = new mongoose.model("MESSAGE", msgSchema);

module.exports = Message;