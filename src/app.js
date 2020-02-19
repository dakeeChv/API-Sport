const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

dotenv.config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

//config
require('./config/connectDB')(app)
require('./config/passport')

//set Routes
app.use(
    require('./routes/UserRoute'), 
    require('./routes/SportTypeRoute')
)
//app.use(require('./routes/SportTypeRoute'))

module.exports = app