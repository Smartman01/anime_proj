const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    characteristics: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('Anime', animeSchema)