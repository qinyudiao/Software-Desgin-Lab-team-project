let mongoose = require('mongoose')

// Schema for subscribers
let subscriberSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Subscribers', subscriberSchema);