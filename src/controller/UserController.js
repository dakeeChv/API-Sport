const User = require('../models/UserModel')
const Joi = require('@hapi/joi')
const bcryptjs = require('bcryptjs')

exports.signup = async (req, res, next) => {
    try {

        const { error } = validateSignup(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const accountExist = await User.findOne({ username: req.body.username })
        if (accountExist) return res.status(400).send('Account Already Exists')

        var salt = await bcryptjs.genSalt(8)
        var hash = await bcryptjs.hash(req.body.password, salt)

        const UserInfo = new User({
            username : req.body.username,
            password : hash,
            classroom_id : req.body.classroom_id,
            userType_id : req.body.userType_id,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        
        await UserInfo.save()
        const token = UserInfo.generateJWT()
        
        res.status(201).header('authorization', token).end('Signup, Success')

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.signin = async (req, res, next) => {
    try {
        const {error} = validateSignin(req.body)
        
        //401 Unauthorized
        if(error) return res.status(401).send({ message: 'info incorrect, ' + error.details[0].message })

        await User.findOne({ username: req.body.username }).then(async user => { 
            if (user) {
                const { password } = user

                //password correct
                const validPass = await bcryptjs.compare(req.body.password, password)
                if(!validPass) return res.status(400).send('Invalid password')
        
                //create and assign the token
                user.token = user.generateJWT()
                const info =  user.toAuthJSON()

                // 202 Accepted
                return res.status(202).header('auto-token', user.token).send(info);
    
            } else {
                return res.status(400).send("Account isn't signup")
            }
        })
    
    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.update = async (req, res, next) => {
    try{
        const { error } = validateUpdate(req.body)
        if (error) return res.status(400).send(error)

        const accountExist = await User.findOne({ _id: req.body.id })
        if (!accountExist) return res.status(400).send("Account is't signup")

        var salt = await bcryptjs.genSalt(8)
        var hash = await bcryptjs.hash(req.body.password, salt)


        await User.updateOne({_id: req.body.id}, {$set: {
            username : req.body.username,
            password : hash,
            classroom_id : req.body.classroom_id,
            userType_id : req.body.userType_id,
            updatedAt: new Date()
        }})

        const token = await accountExist.generateJWT()
        
        return res.status(200).header('authorization', token).send('Update User, Success')
        
    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.destory = async (req, res) => {
    try {
        const id = req.params.id

        const accountExist = await User.findOne({ _id: id })
        if (!accountExist) return res.status(400).send("Account is't signup")

        await User.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result) return res.status(200).send('Delete User, Success')
        })
        .catch(error => {
            if (error) return res.status(400).send("Account can't delete")
        })

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.read = async (req, res) =>{
    try {
        const UserInfo = await User.find().populate('userType_id classroom_id')
        return res.status(200).send(UserInfo)

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}



function validateSignup (data) {
    Schema = Joi.object().keys({
        username: Joi.string().min(4).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
        classroom_id: Joi.string().required(),
        userType_id: Joi.string().required()
    })

    return Schema.validate(data)
}

function validateSignin (data) {
    Schema = Joi.object().keys({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(8).required(),
    })

    return Schema.validate(data)
}

function validateUpdate (data) {
    Schema = Joi.object().keys({
        id: Joi.string().required(),
        username: Joi.string().min(4).required(),
        password: Joi.string().min(8).required(),
        classroom_id: Joi.string().required(),
        userType_id: Joi.string().required()
    })

    return Schema.validate(data)
} 


