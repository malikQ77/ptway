const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, () =>
    console.log('--------------Database connected--------------')
)

// activate body parsser (pass in/out request)
app.use(express.json())

// app.use(bodyParser.json())

// middleware of application
app.use(cors())

// Routes --------------------------------------------------
app.use('/api', require('./routes/main'))

// ---------------------------------------------------------

app.get('/', (req, res) => {
    res.send('here the root page')
})
let a = app.listen(4000, '172.20.10.3')