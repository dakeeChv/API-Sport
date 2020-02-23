const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    classroom_id: { type: Object, ref: 'Classrooms', required: true },
    userType_id: { type: Object, ref: 'UserTypes', required: true },
    createdAt: { type: String },
    updatedAt: { type: String, required: true }
}, { collection: 'Users' })

UserSchema.methods.generateJWT = function() {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        classroom_id: this.classroom_id,
        userType_id: this.userType_id,
    }, process.env.secret, { expiresIn: 60 * 60 * 24 * 7 })
}
  
UserSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      username: this.username,
      classroom_id: this.classroom_id,
      userType_id: this.userType_id,
      token: this.generateJWT()
    }
}


module.exports = mongoose.model('User', UserSchema)