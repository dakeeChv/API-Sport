const User = require('../models/User')
const Joi = require('@hapi/joi')
const bcryptjs = require('bcryptjs')

exports.signup = async (req, res, next) => {
    try {

        const { error } = validateSignup(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const accountExist = await User.findOne({ account_name: req.body.account_name })
        if (accountExist) return res.status(400).send('Account Already Exists')

        var salt = await bcryptjs.genSalt(8)
        var hash = await bcryptjs.hash(req.body.password, salt)

        const infoUser = new User({
            account_name : req.body.account_name,
            password : hash,
            classId : req.body.classId,
            typeUserId : req.body.typeUserId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        
        await infoUser.save()
        const token = infoUser.generateJWT()
        
        res.status(201).header('authorization', token).end('Created User')

    } catch (error) {
        console.log(error)
        res.status(500).end('Fail')
    }
}

exports.signin = async (req, res, next) => {
    try {
        const {error} = validateSignin(req.body)
        if(error) return res.status(400).send({ message: 'info incorrect, ' + error.details[0].message })

        await User.findOne({ account_name: req.body.account_name }).then(async user => { 
            if (user) {
                const { account_name, password } = user

                //password correct
                const validPass = await bcryptjs.compare(req.body.password, password)
                if(!validPass) return res.status(400).send('Invalid password')
        
                //create and assign the token
                const info =  user.toAuthJSON()
                return res.header('auto-token', info.token).send(info);
    
            } else {
                return res.status(400).send('Email is not resister')
            }
        })
    
    } catch (error) {
        throw error
    }
}

function validateSignup (data) {
    Schema = Joi.object().keys({
        account_name: Joi.string().min(5).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
        classId: Joi.string().required(),
        typeUserId: Joi.string().required()
    })

    return Schema.validate(data)
}

function validateSignin (data) {
    Schema = Joi.object().keys({
        account_name: Joi.string().min(5).required(),
        password: Joi.string().min(8).required(),
    })

    return Schema.validate(data)
} 


