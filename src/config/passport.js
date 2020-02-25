const User = require('../models/UserModel')
const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use( new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret
}, async (JwtPayload, done) => {
    try {
        await User.findById({ _id: JwtPayload._id }).
            then(user => {
                if (user) {
                    return done(null, user)
                } else {
                    return done(new Error(), false)
                }
            })
    } catch (error) {
        return done(new Error(), false)
    }
}))