const classroom = require('../models/ClassroomModel')

exports.read = async (req, res) =>{
    try {
        const classroomInfo = await classroom.find()
        return res.status(200).send(classroomInfo)

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.search = async (req, res) =>{
    try {
        const classroomInfo = await classroom.find({ classroom: req.body.classroom})
        return res.status(200).send(classroomInfo)

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.create = async (req, res) => {
    try {
        const classroomExist = await classroom.findOne({ classroom: req.body.classroom })
        if (classroomExist) return res.status(400).send('')

        const classroomInfo = new classroom({
            classroom: req.body.classroom,
            color: req.body.color,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await classroomInfo.save()
        return res.status(201).send('')

    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}

exports.update = async (req, res) => {
    try {
        const classroomExist = await classroom.findOne({ _id: req.body.id })
        if (classroomExist) {
            await classroom.updateOne({ _id: req.body.id }, {$set: {
                classroom: req.body.classroom,
                color: req.body.color,
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
        await classroom.findOne({ _id: req.params.id }).then(async classroom => {
            if (classroom) {
                await classroom.deleteOne({ _id: req.params.id })
                return res.status(200).send('Deleted Success')
            } else {
                return res.status(400).send("S")
            }
        })
    } catch (error) {
        console.log(error)
        // 500 Internal Server Error
        return res.status(500).send('Internal Server Error. Please try agrain')
    }
}