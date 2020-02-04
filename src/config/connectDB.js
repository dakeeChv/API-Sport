const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(
        'mongodb+srv://'
        +process.env.User+':'
        +process.env.Password
        +'@cluster0-8jamz.mongodb.net/'
        +process.env.Database+'?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        if (result) console.log('Connect DB ...')
    }).catch(err => console.log(err))
}