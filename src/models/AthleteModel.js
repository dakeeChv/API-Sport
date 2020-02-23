const mongoose = require('mongoose')

const athleteSchema = mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    mobile: {type: Number, required: true},
    DOB: {type: Date, required: true},
    email: {type: String, required: true},
    facebook: {type: String, required: true},
    whatsapp: {type: String, required: true},
    typeUser_id: {type: String, required: true},
    createdAt:{ type: Date},
    updatedAt: { type: Date, required: true}
},{ collection: 'Athletes'})

module.exports = mongoose.model('Athletes', athleteSchema)