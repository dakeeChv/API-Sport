const mongoose = require('mongoose')

const TypeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date },
    updatedAt: { type: Date, required: true }
}, { collection: 'TypeSport'})

module.exports = mongoose.model('TypeSport', TypeSchema)