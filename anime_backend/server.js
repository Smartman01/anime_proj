if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors");

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())
app.use(cors(corsOptions))

const animeWordleRouter = require('./routes/animeWordle')
app.use('/animeWordle', animeWordleRouter)

app.listen(process.env.PORT || 3005, () => console.log('Server Started'))