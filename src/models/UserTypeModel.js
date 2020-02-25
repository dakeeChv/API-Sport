const mongoose = require('mongoose')

const userTypeSchema = mongoose.Schema({
    user_type: {type: String, required: true},
    createdAt: {type: String},
    updatedAt: {type: String, required: true}
},{collection: 'UserTypes'})

module.exports = mongoose.model('UserTypes', userTypeSchema)