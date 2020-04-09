const mongoose = require('mongoose')

// Schema for launchSchema
const launchSchema = mongoose.Schema({
    name:{
        String,
        required: true
    },
    time: {String},
    location:{
        "pads": [
            {
                "id": {Number},
                "name": {String},
                "countryCode": {String},
                "type": {Number}, // 0 for launching, 1 for landing
                "infoURL": {String},
                "wikiURL": {String},
                "infoURLs": [String],
                "latitude": {Number},
                "longitude": {Number},
                "agencies": [
                    {
                        "id": {Number},
                        "name": {String},
                        "countryCode": {String},
                        "type": {Number}, // 1 for government, 2 for international, 3 for commercial
                        "wikiURL": {String},
                        "infoURLs": [String],
                        "islsp": {Number} // 0 for not lsp, 1 for is lsp
                    }
                ]
            }
        ],
        "id": {Number},
        "name": {String},
        "infoURL": {String},
        "wikiURL": {String},
        "countryCode": {String}
    },
    rocket: {
        "id": {Number},
        "agencies": [
            {
                "id": {Number},
                "name": {String},
                "countryCode": {String},
                "type": {Number}, // 1 for government, 2 for international, 3 for commercial
                "wikiURL": {String},
                "infoURLs": [String],
                "islsp": {Number} // 0 for not lsp, 1 for is lsp
            }
        ]
    },
    "missions": [
        {
            "id": {Number},
            "name": {String},
            "description": {String},
            "type": {Number},
            "wikiURL": {String},
            "typeName": {String},
            "agencies": [
                {
                    "id": {Number},
                    "name": {String},
                    "countryCode": {String},
                    "type": {Number}, // 1 for government, 2 for international, 3 for commercial
                    "wikiURL": {String},
                    "infoURLs": [String],
                    "islsp": {Number} // 0 for not lsp, 1 for is lsp
                }
            ],
            "payloads": [
                {
                    "id": {Number},
                    "name": {String}
                }
            ]
        }
    ],
    "lsp": {
        "id": {Number},
        "name": {String},
        "countryCode": {String},
        "type": {Number}, // 1 for government, 2 for international, 3 for commercial
        "infoURL": {String},
        "wikiURL": {String},
        "changed": {String},
        "infoURLs": [String]
    },
    vidURLs: [String],
    holdreason: {String},
    failreason: {String},
    changed: {String}
});

module.exports = mongoose.model('Launch', launchSchema);