const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for launchSchema
const padSchema = Schema({
    "id": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "countryCode": {type: String},
    "type": {type: Number}, // 0 for launching, 1 for landing
    "infoURL": {type: String},
    "wikiURL": {type: String},
    "infoURLs": [String],
    "latitude": {type: Number},
    "longitude": {type: Number},
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    agencies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Agency'
        }
    ],
    "changed": {type: String}
});

module.exports = mongoose.model('Pad', padSchema);