const Type = require('../models/TypeModel')

exports.read = async (req, res) => {
    try {
        const TypeInfo = await Type.find()
        return res.status(200).send(TypeInfo)

    } catch (error) {
        console.log(error)

        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.create = async (req, res) => {
    try {
        const TypeExist = await Type.findOne({ name: req.body.name })
        if (TypeExist) return res.status(400).send('Type Already Exists')

        const TypeInfo = new Type({
            name: req.body.name,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await TypeInfo.save()

        return res.status(201).send('Create Type')

    } catch (error) {
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.update = async (req, res) => {
    try {
        const TypeExist = await Type.findOne({ _id: req.body.id })
        if (TypeExist) {
            await Type.updateOne({ _id: req.body.id }, {$set: {
                name: req.body.name,
                updatedAt: new Date()
            }})
            return res.status(200).send('Updated Type')
        }
        return res.status(400).send("Type can't updated")

    } catch (error) {
      // 500 Internal Server Error
      return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.destory = async (req, res) => {
    try {
        await Type.findOne({ _id: req.params.id }).then(async type => {
            if (type) {
                await Type.deleteOne({ _id: req.params.id })
                return res.status(200).send('Deleted Type')
            } else {
                return res.status(400).send("Type can't deleted")
            }
        })
    } catch (error) {
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}