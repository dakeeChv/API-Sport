const passport = require('passport')
const UserType = require('../models/UserTypeModel')

exports.admin = function (req, res, next) {
  passport.authenticate('jwt', async function (err, user) {
    const admin = await UserType.findOne({_id: user.userType_id})
    if (err || user === false) {
        // 403 Forbidden
      res.status(403).send({
        error: "you can't access to the resource."
      })
    } else if (admin.user_type === 'admin' || admin.user_type === 'Admin') {
      req.user = user
      next()
    } else {
        // 203 // Non-Authoritative Information
        res.status(203).send({
            error: "you can't access to the resource (Only Admin)."
          })
    }
  })(req, res, next)
}