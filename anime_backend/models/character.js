const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
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
    },
    animes: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('Character', characterSchema)