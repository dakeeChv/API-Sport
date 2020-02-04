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

require('./config/connectDB')(app)

const UserRoute = require('./routes/UserRoute')
const AthleteRoute = require('./routes/AthleteRoute')

app.use('',
    UserRoute,
    AthleteRoute
)


module.exports = app