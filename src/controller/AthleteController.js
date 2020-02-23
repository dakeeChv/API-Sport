const athlete = require('../models/AthleteModel')

exports.read = async (req, res) =>{
    try {
        const athleteInfo = await athlete.find()
        return res.status(200).send(athleteInfo)

    } catch (error) {
        return res.status(500).send('')
    }
}

exports.search = async (req, res) =>{
    try {
        const athleteInfo = await athlete.find({ $or: [
            {name: req.body.keyword},
            {surname: req.body.keyword}
        ]})
        return res.status(200).send(athleteInfo)

    } catch (error) {
        return res.status(500).send('')
    }
}

exports.create = async (req, res) => {
    try {
        const athleteInfo = new athlete({
            name: req.body.name,
            surname: req.body.surname,
            mobile: req.body.mobile,
            DOB: req.body.DOB,
            email: req.body.email,
            facebook: req.body.facebook,
            whatsapp: req.body.whatsapp,
            typeUser_id: req.body.typeUser_id,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await athleteInfo.save()
        return res.status(201).send()

    } catch (error) {
        console.log(error)
        return res.status(500).send()
    }
}

exports.update = async (req, res) => {
    try {
        const athleteExist = await athlete.findOne({ _id: req.body.id })
        if (athleteExist) {
            await athlete.updateOne({ _id: req.body.id }, {$set: {
                name: req.body.name,
                surname: req.body.surname,
                mobile: req.body.modile,
                DOB: req.body.BOB,
                email: req.body.email,
                facebook: req.body.facebook,
                whatsapp: req.body.whatsapp,
                typeUser_id: req.body.typeUser_id,
                updatedAt: new Date()
            }})
            return res.status(200).send('')
        }
        return res.status(400).send("")

    } catch (error) {
      return res.status(500).send('')
    }
}

exports.destory = async (req, res) => {
    try {
        await athlete.findOne({ _id: req.params.id }).then(async athlete => {
            if (athlete) {
                await athlete.deleteOne({ _id: req.params.id })
                return res.status(200).send('Deleted Success')
            } else {
                return res.status(400).send()
            }
        })
    } catch (error) {
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}