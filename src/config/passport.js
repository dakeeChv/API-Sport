const User = require('../models/User')
const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use( new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret
}, async (JwtPayload, done) => {
    try {
        const user = await User.find({ _id: JwtPayload.id })
        
        if (user.length >= 1) {
            return done(null, user)
        }
        return done(new Error(), false)
    } catch (error) {
        return done(new Error(), false)
    }
}))