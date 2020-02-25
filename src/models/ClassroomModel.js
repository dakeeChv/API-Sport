const mongoose = require('mongoose')

const classroomSchema = mongoose.Schema({
    classroom: {type: String, required: true},
    color: {type: String, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true}
},{collection: 'Classrooms'})

module.exports = mongoose.model('Classrooms', classroomSchema)