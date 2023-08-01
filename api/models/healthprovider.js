const mongoose = require('mongoose');

const healthProvider = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String,
    searchParameter:[String],
});

module.exports = mongoose.model('HealthProvider', healthProvider);