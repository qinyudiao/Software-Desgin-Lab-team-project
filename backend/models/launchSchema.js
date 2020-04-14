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
    changed: {type: String}
});

module.exports = mongoose.model('launches', launchSchema);