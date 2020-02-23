const athlete = require('../models/AthleteModel')

exports.read = async (req, res) =>{
    try {
        const athleteInfo = await athlete.find().populate('sportType_id')
        return res.status(200).send(athleteInfo)

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.readByChoice = async (req, res) =>{
    try {
        const athleteInfo = await athlete.find().all('sportType_id', req.body).populate('sportType_id')
        return res.status(200).send(athleteInfo)

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
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
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.create = async (req, res) => {
    try {
        const { _id } = req.user
        const athleteInfo = new athlete({
            name: req.body.name,
            surname: req.body.surname,
            mobile: req.body.mobile,
            DOB: req.body.DOB,
            email: req.body.email,
            facebook: req.body.facebook,
            whatsapp: req.body.whatsapp,
            user_id: _id,
            sportType_id: req.body.sportType_id,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await athleteInfo.save()
        return res.status(201).send("Create Athlete, Success")

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
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
                sportType_id: req.body.sportType_id,
                updatedAt: new Date()
            }})
            return res.status(200).send('')
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
        await athlete.findOne({ _id: req.params.id }).then(async athlete => {
            if (athlete) {
                await athlete.deleteOne({ _id: req.params.id })
                return res.status(200).send('Deleted Success')
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