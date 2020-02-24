const userType = require('../models/UserTypeModel')

exports.read = async (req, res) =>{
    try {
        const userTypeInfo = await userType.find()
        return res.status(200).send(userTypeInfo)

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.create = async (req, res) => {
    try {
        const userTypeInfo = new userType({
            user_type: req.body.user_type,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await userTypeInfo.save()
        return res.status(201).send('create userType, Success')

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.update = async (req, res) => {
    try {
        const userTypeExist = await userType.findOne({ _id: req.body.id })
        if (userTypeExist) {
            await userType.updateOne({ _id: req.body.id }, {$set: {
                user_type: req.body.user_type,
                updatedAt: new Date()
            }})
            return res.status(200).send('update UserType, Success')
        }
        return res.status(400).send("")

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.destory = async (req, res) => {
    try {
        await userType.findOne({ _id: req.params.id }).then(async userType => {
            if (userType) {
                await userType.deleteOne({ _id: req.params.id })
                return res.status(200).send('Delete UserType, Success')
            } else {
                return res.status(400).send()
            }
        })
    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}