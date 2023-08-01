const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    type: {type: String, required: true},
    details: {type:[String], required: true}
});

module.exports = mongoose.model('Exercise', exerciseSchema);