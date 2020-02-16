const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

dotenv.config()

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

//config
require('./config/connectDB')(app)
require('./config/passport')

//set Routes
app.use('/register', require('./routes/User'))
app.use('/types', require('./routes/Type'))

module.exports = app