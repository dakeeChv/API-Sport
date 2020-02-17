const passport = require('passport')

exports.admin = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || user === false) {
        // 403 Forbidden
      res.status(403).send({
        error: "you can't access to the resource."
      })
    } else if (user.typeUserId === 'admin' || user.typeUserId === 'Admin') {
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