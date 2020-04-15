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
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    rocket: {
        type: Schema.Types.ObjectId,
        ref: 'Rocket'
    },
    "missions": [
        {
            "id": {type: Number, required: true},
        }
    ],
    "lsp": {
        type: Schema.Types.ObjectId,
        ref: 'Agency'
    },
    vidURLs: [String],
    holdreason: {type: String},
    failreason: {type: String},
    changed: {type: String},
    locationData: {
        "id": {
            type: Number,
        },
        "name": {type: String},
        "countrycode": {type: String},
        "wikiURL": {type: String},
        "infoURLs": [String],
        "imageURL": {type: String},
        "changed": {type: String}
    },
    rocketData: {
        "id": {
            type: Number,
        },
        "name": {type: String},
        "configuration": {type: String},
        "family": {
            id: {type: Number},
            name: {type: String},
            agencies: {type: String}
        },
        "wikiURL": {type: String},
        "infoURLs": [String],
        "imageURL": {type: String},
        "changed": {type: String}
    },
    missionData: {
        "id": {
            type: Number,
        },
        "name": {
            type: String,
        },
        "countryCode": {type: String},
        "description": {type: String},
        "typeName": {type: String},
        launch: {
            "id": {type: Number},
            "name": {type: String},
            "net": {type: String}
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
    }
});

module.exports = mongoose.model('launches', launchSchema);