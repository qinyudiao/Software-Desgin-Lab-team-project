let mongoose = require('mongoose')
let Schema = mongoose.Schema

// Schema for agencies
let agencySchema = Schema({
    "id": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "countryCode": {type: String},
    "type": {type: Number}, // 1 for government, 2 for international, 3 for commercial
    "wikiURL": {type: String},
    "infoURLs": [String],
    "islsp": {type: Number}, // 0 for not lsp, 1 for is lsp
    "changed": {type: String},
    "wikiInfo":{
        "title":{type: String},
        "page":{type:String},
        "extract":{type: String},
        "image":{type: String}
        }
});

module.exports = mongoose.model('agencies', agencySchema);