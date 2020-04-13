let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema for rockets
let rocketSchema = Schema({
    "id": {
        type: Number,
        required: true
    },
    "name": {type: String},
    "configuration": {type: String},
    "familyname": {type: String},
    "agencies": [
        {
            type: Schema.Types.ObjectId,
            ref: 'Agency'
        }
    ],
    "wikiURL": {type: String},
    "infoURLs": [String],
    "imageURL": {type: String},
});

module.exports = mongoose.model('rockets', rocketSchema);