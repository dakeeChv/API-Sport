const mongoose = require('mongoose')

const TypeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date },
    updatedAt: { type: Date, required: true }
}, { collection: 'Types'})

module.exports = mongoose.model('Type', TypeSchema)