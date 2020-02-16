const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    account_name: { type: String, required: true },
    password: { type: String, required: true },
    classId: { type: String, required: true },
    typeUserId: { type: String, required: true },
    createdAt: { type: String },
    updatedAt: { type: String, required: true }
}, { collection: 'Users' })

UserSchema.methods.generateJWT = function() {
    return jwt.sign({
        id: this._id,
        user: this.account_name,
        classId: this.classId
    }, process.env.secret, { expiresIn: 60 * 60 * 24 * 7 })
}
  
UserSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      user: this.account_name,
      token: this.generateJWT()
    }
}


module.exports = mongoose.model('User', UserSchema)