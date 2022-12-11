const mongoose = require('mongoose')

const dayIndexSchema = new mongoose.Schema({
    index_anime: {
        type: Number,
        required: true
    },
    index_character: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('DayIndex', dayIndexSchema)