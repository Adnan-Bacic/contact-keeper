const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
        //refer to the mongodb users collection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
    },
    type:{
        type: String,
        default: 'Personal'
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('contact', ContactSchema);