const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for missionSchema
const missionSchema = Schema({
    "id": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "countryCode": {type: String},
    "description": {type: String},
    "typeName": {type: String},
    "launch": {
        "id": {type: Number},
    },
    agencies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Agency'
        }
    ],
    "wikiURL": {type: String},
    "infoURLs": [String],
    "changed": {type: String},
})

module.exports = mongoose.model('Mission', missionSchema);