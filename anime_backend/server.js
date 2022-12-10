if (process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())

const animeWordleRouter = require('./routes/animeWordle')
app.use('/animeWordle', animeWordleRouter)

app.listen(process.env.PORT || 3005, () => console.log('Server Started'))