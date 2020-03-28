let mongoose = require('mongoose');

// Schema for companies
let companySchema = mongoose.Schema({
    A:{
        type: String,
        required: true
    },
    B:{
        type: String,
    },
    C:{
        type: String,
    },
    D:{
        type: String,
    },
    E:{
        type: String,
    },
    F:{
        type: String,
    },
    G:{
        type: String,
    },
    H:{
        type: String,
    },
    I:{
        type: String,
    },
    J:{
        type: String,
    },
    K:{
        type: String,
    },
    L:{
        type: String,
    },

});

module.exports = mongoose.model('companies', companySchema);