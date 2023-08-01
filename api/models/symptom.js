const mongoose = require('mongoose');

const symptomsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    cause: [String],
    treatment: [String],
    searchParameter: [String]
});

module.exports = mongoose.model('Symptom', symptomsSchema);