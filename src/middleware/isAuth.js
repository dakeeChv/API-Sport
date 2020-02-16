const passport = require('passport')

exports.auth = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || user === false) {
      res.status(403).send({
        error: "you can't access to the resource."
      })
    } else {
      req.user = user;
      next()
    }
  })(req, res, next)
}