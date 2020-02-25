const mongoose = require('mongoose')

const TypeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date },
    updatedAt: { type: Date, required: true }
}, { collection: 'SportTypes'})

module.exports = mongoose.model('SportTypes', TypeSchema)