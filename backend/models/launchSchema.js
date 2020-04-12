const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for launchSchema
const launchSchema = Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    isonet: {type: String},
    location:{
        "pads": [
            {
                "id": {type: Number},
                "name": {type: String},
                "countryCode": {type: String},
                "type": {type: Number}, // 0 for launching, 1 for landing
                "infoURL": {type: String},
                "wikiURL": {type: String},
                "infoURLs": [String],
                "latitude": {type: Number},
                "longitude": {type: Number},
                agencies: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Agency'
                    }
                ]
            }
        ],
        "id": {type: Number},
        "name": {type: String},
        "infoURL": {type: String},
        "wikiURL": {type: String},
        "countryCode": {type: String}
    },
    rocket: {
        type: Schema.Types.ObjectId,
        ref: 'Rocket'
    },
    "missions": [
        {
            "id": {type: Number},
            "name": {type: String},
            "description": {type: String},
            "type": {type: Number},
            "wikiURL": {type: String},
            "typeName": {type: String},
            agencies: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Agency'
                }
            ],
            "payloads": [
                {
                    "id": {type: Number},
                    "name": {type: String}
                }
            ]
        }
    ],
    "lsp": {
        "id": {type: Number},
        "name": {type: String},
        "countryCode": {type: String},
        "type": {type: Number}, // 1 for government, 2 for international, 3 for commercial
        "infoURL": {type: String},
        "wikiURL": {type: String},
        "changed": {type: String},
        "infoURLs": [String]
    },
    vidURLs: [String],
    holdreason: {type: String},
    failreason: {type: String},
    changed: {type: String}
});

module.exports = mongoose.model('Launch', launchSchema);