const SportType = require('../models/SportTypeModel')

// Get to all type of sport
exports.read = async (req, res) => {
    try {
        const SportTypeInfo = await SportType.find()
        return res.status(200).send(SportTypeInfo)

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

// Add type of sport
exports.create = async (req, res) => {
    try {
        const SportTypeExist = await SportType.findOne({ name: req.body.name })
        if (SportTypeExist) return res.status(400).send('SportType Already Exists')

        const SportTypeInfo = new SportType({
            name: req.body.name,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await SportTypeInfo.save()

        return res.status(201).send('Create SportType, Success')

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

// update type of sport
exports.update = async (req, res) => {
    try {
        const SportTypeExist = await SportType.findOne({ _id: req.body.id })
        if (SportTypeExist) {
            await SportType.updateOne({ _id: req.body.id }, {$set: {
                name: req.body.name,
                updatedAt: new Date()
            }})
            return res.status(200).send('Updated SportType, Success')
        }
        return res.status(400).send("SportType can't update")

    } catch (error) {
      console.log(error)
      // 500 Internal Server Error
      return res.status(500).send('Internal Server Error. Please try again')
    }
}

// delete type of sport
exports.destory = async (req, res) => {
    try {
        await SportType.findOne({ _id: req.params.id }).then(async SportType => {
            if (SportType) {
                await SportType.deleteOne({ _id: req.params.id })
                return res.status(200).send('Deleted SportType, Success')
            } else {
                return res.status(400).send("SportType can't delete")
            }
        })
    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}