const mongoose = require('mongoose');

const nutritionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    details: [String]

});

module.exports = mongoose.model('Nutrition', nutritionSchema);