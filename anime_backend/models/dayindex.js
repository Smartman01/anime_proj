const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const dayIndexSchema = new mongoose.Schema({
    index_anime: {
        type: Int32,
        required: true
    },
    index_character: {
        type: Int32,
        required: false
    }
})

module.exports = mongoose.model('DayIndex', dayIndexSchema)